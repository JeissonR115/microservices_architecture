import { DataBase } from "./DataBase.js";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { Inserter } from "./Inserter.js";

export class Server {
    constructor({ url, dbName, collectionList, collectionName, port }) {
        this.url = url;
        this.dbName = dbName;
        this.collectionList = collectionList;
        this.collectionName = collectionName;
        this.port = port;
        this.serverRunning = false;
    }

    async start() {
        await this.setupExpressApp();
        await this.connectToDatabase();
        this.setupRoutes();// Define las rutas de la aplicación Express
        await this.listenAndServe(); // Intenta iniciar el servidor en el puerto especificado
        return this.serverRunning;// Devuelve el estado del servidor
    }

    async setupExpressApp() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
    }

    async connectToDatabase() {
        const dataBase = new DataBase(this.url, this.dbName, this.collectionList);
        await dataBase.connectDB();
        dataBase.use(this.collectionName);
    }

    setupRoutes() {
        this.app.get('/', (req, res) => {
            const message = this.serverRunning ? 'Servidor en ejecución' : 'Error en el servidor';
            res.send(`<html><body><h1>${message}</h1></body></html>`);
        });

        this.app.post('/insert', async (req, res) => {
            // Lógica para insertar datos en la base de datos
        });
    }

    async listenAndServe(maxAttempts = 10, retryDelay = 500) {
        let attempts = 0; // Contador de intentos

        const startServer = async () => {
            try {
                await new Promise((resolve, reject) => {
                    this.app.listen(this.port, () => {
                        console.log(`Servidor en ejecución en http://localhost:${this.port}`);
                        this.serverRunning = true;
                        resolve();
                    }).on('error', (err) => {
                        if (err.code === 'EADDRINUSE') {
                            console.error(`El puerto ${this.port} está ocupado. Cambiando al siguiente puerto.`);
                            this.port++;
                            console.log(`Intentando iniciar en el puerto ${this.port}...`);
                            attempts++;
                            setTimeout(() => {
                                resolve(); // Intentar nuevamente después de un breve retraso
                            }, retryDelay);
                            
                        } else {
                            console.error(`Error al iniciar el servidor: ${err.message}`);
                            reject(err);
                        }
                    });
                });
            } catch (error) {
                console.error(`Error al iniciar el servidor: ${error.message}`);
            }
        };

        while (!this.serverRunning && attempts < maxAttempts) {
            await startServer();
        }

        if (!this.serverRunning) {
            console.error(`No se pudo iniciar el servidor después de ${maxAttempts} intentos.`);
        }

        return this.serverRunning;
    }
}

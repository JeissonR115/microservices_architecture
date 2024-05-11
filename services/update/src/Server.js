import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import {Updater } from "./Updater.js";

export class Server {
    constructor({ port, db = null }) {
        this.port = port;
        this.serverRunning = false;
        this.db = db
    }

    async start() {
        await this.setupExpressApp();
        await this.db.connectDB();
        this.setupRoutes();// Define las rutas de la aplicación Express
        await this.listenAndServe(); // Intenta iniciar el servidor en el puerto especificado
        return this.serverRunning;// Devuelve el estado del servidor
    }

    async setupExpressApp() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
    }


    setupRoutes() {
        this.app.get('/', (req, res) => {
            const message = this.serverRunning ? 'Servidor en ejecución' : 'Error en el servidor';
            res.send(`<html><body><h1>${message}</h1></body></html>`);
        });

        this.app.put('/update', async (req, res) => {
            try {
                const updater = new Updater({
                    db: await this.db.getDB(),
                    collectionName: 'UsuariosM'
                });
                const result = await updater.updateData(req.body.Documento, req.body);
                res.status(200).json(result);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
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

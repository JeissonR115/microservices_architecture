import { DataBase } from "./src/DataBase.js";
import { Server } from "./src/Server.js";

const dbConfig = {
    host: 'localhost', // Cambia estos valores según tu configuración de MySQL
    user: 'jeissonr115',
    password: 'pipe115.',
    database: 'users'
};

export const dataBase = new DataBase(dbConfig);

export class Main {
    static startServer() {
        const server = new Server({
            port: 3000,
            db: dataBase,
        });
        server.start();
    }
}

Main.startServer();

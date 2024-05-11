import { DataBase } from "./src/DataBase.js";
import { Server } from "./src/Server.js";
export const dataBase = new DataBase({
    url: 'mongodb+srv://ambidata2024:ambidata2024**@ambidata.vn0dlbx.mongodb.net/',
    dbName: 'ambidata',// Definir el nombre de la base de datos.
    collections: {
        sensorData: "sensorData",
        users: "users",
        UsuariosM: "UsuariosM"
    }
})
export class Main {
    static startServer() {
        const server = new Server({
            port: 3030,
            db: dataBase,
        });
        server.start();
    }
}
Main.startServer();
import { Server } from "./src/Server.js";

export class Main {
    static startServer() {
        const collections = {
            sensorData: "sensorData",
            users: "users",
            UsuariosM:"UsuariosM"
        };
        const server = new Server({
            port:  3000 ,
            url: 'mongodb+srv://ambidata2024:ambidata2024**@ambidata.vn0dlbx.mongodb.net/' ,
            dbName:  'ambidata',// Definir el nombre de la base de datos.
            collectionList: collections,// Definir una lista de colecciones dentro de la base de datos.
            collectionName: collections.UsuariosM,// En este caso, se utiliza la colección 'sensorData' como la colección principal.
        });
        server.start();
    }
}
Main.startServer();
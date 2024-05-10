import {MongoClient} from "mongodb";

export class DataBase {
    constructor(url, dbName, collections) {
        this.url = url;
        this.dbName = dbName;
        this.collectionList = collections;
        this.db = null;
        this.collection = null; // Variable para almacenar la conexión a la colección
    }

    async connectDB() {
        try {
            const client = await MongoClient.connect(this.url);
            console.log('Conexión exitosa a MongoDB');
            this.db = client.db(this.dbName);
            return true;
        } catch (err) {
            throw new Error('No se ha establecido la conexión a la base de datos');
        }
    }

    async use(collectionName) {
        if (!Object.keys(this.collectionList).includes(collectionName)) {
            console.error('La colección no está en la lista.');
            return false;
        }
        this.collection = this.db.collection(collectionName);
        console.log("usando a la colección " + collectionName);
        return true;
    }
    async getDB() {
        if (!this.db) {
            await this.connectDB();
        }
        return this.db;
    }


}


import mysql from 'mysql';

export class DataBase {
    constructor({ host, user, password, database }) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
        this.connection = null;
    }

    async connectDB() {
        this.connection = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });

        return new Promise((resolve, reject) => {
            this.connection.connect(err => {
                if (err) {
                    console.error('Error al conectar a la base de datos:', err);
                    reject(err);
                } else {
                    console.log('Conexión exitosa a MySQL');
                    resolve();
                }
            });
        });
    }

    async getDB() {
        if (!this.connection) {
            await this.connectDB();
        }
        return this.connection;
    }
}

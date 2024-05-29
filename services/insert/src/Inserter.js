export class Inserter {
    constructor({ data, db, tableName }) {
        this.data = data;
        this.name = data.name;
        this.age = data.age;
        this.db = db;
        this.tableName = tableName;
    }

    async insertData() {
        this.validateData();
        const dataToInsert = {
            name: this.name,
            age: this.age
        };
        try {
            const query = `INSERT INTO ${this.tableName} SET ?`;
            const result = await this.db.query(query, dataToInsert);
            return { success: true, id: result.insertId, message: 'Datos insertados correctamente' };
        } catch (error) {
            console.error('Error al insertar datos:', error);
            throw new Error('Error al insertar datos en la base de datos');
        }
    }

    validateData() {
    }
}

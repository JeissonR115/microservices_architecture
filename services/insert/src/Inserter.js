export class Inserter {
    constructor({ data, db, collectionName }) {
        this.data = data; // Almacena los datos en la instancia
        this.idNumber = String(data.idNumber);
        this.name1 = data.name1.toLowerCase();
        this.name2 = data.name2.toLowerCase();
        this.lastName1 = data.lastName1.toLowerCase();
        this.lastName2 = data.lastName2.toLowerCase();
        this.email = data.email.toLowerCase();
        this.phoneNumber = data.phoneNumber;
        this.db = db;
        this.collectionName = collectionName;
    }

    validateData() {
        const errors = {};
        const { idNumber, name1, name2, lastName1, lastName2, email, phoneNumber } = this.data; // Usa los datos almacenados en la instancia
        // Validación de cada campo
        if (!idNumber) errors.idNumber = 'El número de identificación es obligatorio';
        if (!name1 || !/^[a-zA-Z]+$/.test(name1)) errors.name1 = 'El primer nombre solo puede contener letras';
        if (!name2 || !/^[a-zA-Z]+$/.test(name2)) errors.name2 = 'El segundo nombre solo puede contener letras';
        if (!lastName1 || !/^[a-zA-Z]+$/.test(lastName1)) errors.lastName1 = 'El primer apellido solo puede contener letras';
        if (!lastName2 || !/^[a-zA-Z]+$/.test(lastName2)) errors.lastName2 = 'El segundo apellido solo puede contener letras';
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'El correo electrónico no tiene un formato válido';
        if (!phoneNumber || !/^\d{7,10}$/.test(phoneNumber)) errors.phoneNumber = 'El número de teléfono debe tener entre 7 y 10 dígitos';
        // Lanzar excepción si hay errores
        if (Object.keys(errors).length > 0) throw new Error(JSON.stringify({ error: errors }));
    }

    async insertData() {
        this.validateData(); // Validar los datos
        const dataToInsert = {
            Documento: this.idNumber,
            Nombre1: this.name1,
            Nombre2: this.name2,
            Apellido1: this.lastName1,
            Apellido2: this.lastName2,
            Correo: this.email,
            Telefono: this.phoneNumber
        };
        try {
            const result = await this.db.collection(this.collectionName).insertOne(dataToInsert);
            return { success: true, id: result.insertedId, message: 'Datos insertados correctamente' };
        } catch (error) {
            console.error('Error al insertar datos:', error);
            throw new Error('Error al insertar datos en la base de datos');
        }
    }
}

export class Updater {
    constructor({ db, collectionName }) {
        this.db = db;
        this.collectionName = collectionName;
    }

    async updateData(documentToUpdate, newData) {
        try {
            const result = await this.db.collection(this.collectionName).updateOne(
                { Documento: documentToUpdate }, // Filtra por el campo Documento
                { $set: newData } // Define qué campos actualizar y sus nuevos valores
            );
    
            if (result.matchedCount === 0) {
                throw new Error('No se encontraron documentos para actualizar');
            }
    
            return { success: true, message: 'Datos actualizados correctamente' };
        } catch (error) {
            console.error('Error al actualizar datos:', error);
            throw new Error('Error al actualizar datos en la base de datos');
        }
    }
    
}

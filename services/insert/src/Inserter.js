export class Inserter {
    constructor({ idNumber, name1, name2, lastName1, lastName2, email, phoneNumber }) {
        this.idNumber = Number(idNumber); 
        this.name1 = name1.toLowerCase(); 
        this.name2 = name2.toLowerCase(); 
        this.lastName1 = lastName1.toLowerCase(); 
        this.lastName2 = lastName2.toLowerCase(); 
        this.email = email.toLowerCase();
        this.phoneNumber = phoneNumber;
    }

    // Este método formateará los datos según sea necesario
    formatData() {
        // Aquí puedes realizar cualquier formateo de datos necesario
        // Por ejemplo, puedes combinar nombres y apellidos, validar el formato del correo electrónico, etc.
        const formattedData = {
            idNumber: this.idNumber,
            fullName: `${this.name1} ${this.name2} ${this.lastName1} ${this.lastName2}`,
            email: this.email,
            phoneNumber: this.phoneNumber // Mantener el número de teléfono sin cambios
        };
        return formattedData;
    }
    isValidEmail(email) {
        // Expresión regular para validar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

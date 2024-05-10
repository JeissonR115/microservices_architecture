const { exec } = require('child_process');

// Define the list of microservice files
const microservices = [
    { path: './services/insert/main.js', command: 'node' },
    { path: './services/delete/main.py', command: 'python3' },
    { path: './services/query/main.jar', command: 'java -jar' },
];

// Execute each microservice
microservices.forEach(microservice => {
    console.log(`Ejecutando microServicio: ${microservice.path}`);
    const process = exec(`${microservice.command} ${microservice.path}`);

    process.stdout.on('data', data => {
        console.log(`Salida de ${microservice.path}: ${data}`);
    });

    process.stderr.on('data', data => {
        console.error(`Error en ${microservice.path}: ${data}`);
    });

    process.on('close', code => {
        console.log(`MicroServicio ${microservice.path} saliendo con el código ${code}(${code == 0 ? 'ok' : 'Error'})`);
    });
});

console.log("All microservices are running.");

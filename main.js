const { exec } = require('child_process');

// Define the list of microservice files
const microservices = [
    { path: './services/insert/main.js', command: 'node', lang:'JS' },
    { path: './services/delete/main', command: '', lang:'GO' },//go
    { path: './services/query/main.py', command: 'python3', lang:'PY' },
    { path: './services/update/main.js', command: 'node', lang:'JS' },
];

// Execute each microservice
microservices.forEach(microservice => {
    console.log(`Ejecutando microServicio: ${microservice.path}`);
    const process = exec(`${microservice.command} ${microservice.path}`);

    process.stdout.on('data', data => {
        console.log(`${microservice.lang} --> ${data}`);
    });

    process.stderr.on('data', data => {
        console.log(`!! ${microservice.lang} --> ${microservice.path}: ${data}`);
    });

    process.on('close', code => {
        console.log(`MicroServicio ${microservice.path} saliendo con el código ${code}(${code == 0 ? 'ok' : 'Error'})`);
    });
});

console.log("All microservices are running.");

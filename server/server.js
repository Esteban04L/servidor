const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Ruta estática para los archivos HTML y recursos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para manejar datos JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para guardar datos en un archivo .txt
app.post('/save-user', (req, res) => {
    const userData = req.body;

    // Formatear los datos para el archivo
    const formattedData = `
Nombre: ${userData.firstName}
Apellido: ${userData.lastName}
Correo: ${userData.email}
Dirección: ${userData.address}
Teléfono: ${userData.phone}
Sexo: ${userData.gender}
Edad: ${userData.age}
Fecha de Nacimiento: ${userData.birthDate}
Nombre de Usuario: ${userData.username}
-----------------------------
`;

    // Guardar en un archivo .txt
    const filePath = path.join(__dirname, 'users.txt');
    fs.appendFile(filePath, formattedData, (err) => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            return res.status(500).send('Error al guardar los datos.');
        }
        res.send('Usuario registrado correctamente.');
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

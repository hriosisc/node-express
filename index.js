// Inicializar servidor con Express
const express = require('express');
const filesystem = require('fs');

const app = express();
const port = 3000;

// Middleware: Intercepta antes de enviar una respuesta
app.use(express.static('public'));
// Middleware para poder leer los parametros de formularios tipo POST
app.use(express.urlencoded({ extended: true }));

// Escuchar ruta raiz
app.get('/', (req, res) => {
    res.send("Index");
});

// #Escuchar al formulario
// #Obtener datos del formulario para GET
app.get('/formulario', (req, res) => {
    const body = req.query;
    // #<<req.query>> retorna un objeto con los parametros enviados del formulario.
    console.log(body)
    res.send("Formulario enviado");
});

// Obtener datos del formulario para POST
app.post('/formulario', (req, res) => {
    // #Es requerido el middleware (JSON, RAW, TEXT, URLENCODED) para poder leer los parametros.
    const { name, lastname } = req.body;
    // #<<req.body>> retorna un objeto con los parametros enviados del formulario.
    if(!name || !lastname) return res.redirect("/error.html");
    // #Uso de la libreria FileSystem para crear archivos
    filesystem.writeFile(`Files/${name}_${lastname}.txt`, name, (err) => {
        if(err) return res.send("Fallo al crear el archivo.");
        res.download(__dirname + `/Files/${name}_${lastname}.txt`);
    }); 
});


// Escuchar ruta Main
app.get('/main', (req, res) => {
    res.send("Main");
});

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});

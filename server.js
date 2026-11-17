const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// 01 Configuración del Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// 10 Conexión a la base de datos por SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('[ (X) Error al conectar con SQLite: ', err.message, ' ]');
    } else {
        console.log('[ (✓) Conectado a la base de datos SQLite. ]');
    }
});

// 11 Crear tabla si no existe
db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        correo TEXT NOT NULL,
        telefono TEXT NOT NULL
    )
`);

// 100 Es la ruta principal para consultar registros y cargar formulario
app.get('/', (req, res) => {
    const busqueda = req.query.buscar || '';
    let sql = 'SELECT * FROM usuarios';
    let params = [];

    if (busqueda) {
        sql += ' WHERE nombre LIKE ? OR correo LIKE ?';
        params = [`%${busqueda}%`, `%${busqueda}%`];
    }

    db.all(sql, params, (err, usuarios) => {
        if (err) return res.status(500).send(err.message);
        res.render('index', { usuarios, usuarioEditar: null, busqueda });
    });
});

// 101 Es la ruta para insertar datos en los registros
app.post('/insertar', (req, res) => {
    const { nombre, correo, telefono } = req.body;
    const sql = 'INSERT INTO usuarios (nombre, correo, telefono) VALUES (?, ?, ?)';

    db.run(sql, [nombre, correo, telefono], (err) => {
        if (err) return res.status(500).send(err.message);
        res.redirect('/');
    });
});

// 110 Es la ruta para cargar los datos en el formulario y modificar
app.get('/editar/:id', (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM usuarios WHERE id = ?', [id], (err, usuarioEditar) => {
        if (err) return res.status(500).send(err.message);

        db.all('SELECT * FROM usuarios', [], (err, usuarios) => {
            if (err) return res.status(500).send(err.message);
            res.render('index', { usuarios, usuarioEditar, busqueda: '' });
        });
    });
});

// 111 Es la que se encarga de guardar la modificación
app.post('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, correo, telefono } = req.body;
    const sql = 'UPDATE usuarios SET nombre = ?, correo = ?, telefono = ? WHERE id = ?';

    db.run(sql, [nombre, correo, telefono, id], (err) => {
        if (err) return res.status(500).send(err.message);
        res.redirect('/');
    });
});

// 1000 Es la ruta para borrar registros
app.get('/borrar/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err.message);
        res.redirect('/');
    });
});

// 1001 Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`[ (✓) Servidor ejecutándose en http://localhost:${PORT} ]`);
});

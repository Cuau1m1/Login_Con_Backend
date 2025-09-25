
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Para entender el JSON que envía el frontend
app.use(express.static('public')); // Para servir tus archivos HTML, CSS, etc.

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'usuarios_login'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos MySQL.');
});

app.post('/register', async (req, res) => {
    const { nombre, apellido, usuario, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);

    const sql = 'INSERT INTO users (nombre, apellido, correo, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, apellido, usuario, hashedPassword], (err, result) => {
        if (err) {
            console.error(err);
        //correo duplicado
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'El correo ya está registrado.' });
            }
            return res.status(500).json({ message: 'Error en el servidor.' });
        }
        res.status(201).json({ message: 'Usuario registrado con éxito.' });
    });
});


// login
app.post('/login', (req, res) => {
    const { usuario, password } = req.body; 

    const sql = 'SELECT * FROM users WHERE correo = ?';
    db.query(sql, [usuario], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor.' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
           
            res.status(200).json({ message: 'Login exitoso.' });
        } else {
        
            res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
        }
    });
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
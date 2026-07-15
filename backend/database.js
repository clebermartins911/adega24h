const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/adega24h.db", (err) => {
    if (err) {
        console.log("Erro ao conectar no banco:", err.message);
    } else {
        console.log("Banco conectado com sucesso!");
    }
});

module.exports = db;
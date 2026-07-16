const db = require("./database");

db.run(`
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT,
    email TEXT
)
`, (err) => {
    if (err) {
        console.log("Erro ao criar clientes:", err.message);
    } else {
        console.log("Tabela clientes criada com sucesso!");
    }
});
const db = require("./database");

db.run(`
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT
)
`, (err) => {

    if (err) {
        console.log("Erro ao criar tabela categories:", err.message);
    } else {
        console.log("Tabela categories criada com sucesso!");
    }

    db.close();

});
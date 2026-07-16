const db = require("./database");

db.run(`
CREATE TABLE IF NOT EXISTS stock (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto_id INTEGER NOT NULL,
    tipo TEXT NOT NULL,
    quantidade INTEGER NOT NULL,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(produto_id) REFERENCES products(id)
)
`, (err) => {
    if (err) {
        console.log("Erro ao criar tabela estoque:", err.message);
    } else {
        console.log("Tabela estoque criada com sucesso!");
    }
});
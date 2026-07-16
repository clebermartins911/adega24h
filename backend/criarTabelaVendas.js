const db = require("./database");

db.run(`
CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER,
    produto_id INTEGER,
    quantidade INTEGER NOT NULL,
    total REAL NOT NULL,
    data DATETIME DEFAULT CURRENT_TIMESTAMP
)
`, (err) => {
    if (err) {
        console.log("Erro ao criar vendas:", err.message);
    } else {
        console.log("Tabela vendas criada com sucesso!");
    }
});
const db = require("./database");

db.run(
    `
CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT,
    email TEXT
)
`,
    (err) => {
        if (err) {
            console.log("Erro ao criar fornecedores:", err.message);
        } else {
            console.log("Tabela fornecedores criada com sucesso!");
        }
    }
);

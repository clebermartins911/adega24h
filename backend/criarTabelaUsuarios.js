const db = require("./database");

db.serialize(() => {
    db.run(
        `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL,
            perfil TEXT NOT NULL DEFAULT 'funcionario',
            ativo INTEGER NOT NULL DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `,
        (err) => {
            if (err) {
                console.error("Erro ao criar tabela users:", err.message);
            } else {
                console.log("Tabela users criada com sucesso!");
            }
        }
    );
});

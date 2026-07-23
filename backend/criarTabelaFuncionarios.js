const db = require("./database");

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            telefone TEXT,
            email TEXT,
            usuario TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL,
            cargo TEXT NOT NULL,
            permissao TEXT NOT NULL,
            ativo INTEGER DEFAULT 1,
            data_cadastro TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `, (erro) => {

        if (erro) {
            console.log("Erro ao criar tabela:", erro.message);
        } else {
            console.log("Tabela employees criada com sucesso!");
        }

        db.close();
    });

});
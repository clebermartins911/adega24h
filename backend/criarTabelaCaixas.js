const db = require("./database");

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS caixas (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            codigo TEXT NOT NULL UNIQUE,

            nome TEXT NOT NULL,

            status TEXT DEFAULT 'FECHADO',

            criado_em TEXT DEFAULT CURRENT_TIMESTAMP

        )
    `, (erro) => {

        if (erro) {
            console.log("Erro ao criar tabela caixas:", erro.message);
        } else {
            console.log("Tabela caixas criada com sucesso!");
        }

        db.close();
    });

});
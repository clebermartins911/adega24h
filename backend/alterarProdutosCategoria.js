const db = require("./database");

db.run(
    `
    ALTER TABLE products
    ADD COLUMN categoria_id INTEGER
    `,
    (err) => {
        if (err) {
            console.log("Erro ao alterar tabela:", err.message);
        } else {
            console.log("Campo categoria_id adicionado com sucesso!");
        }
    }
);

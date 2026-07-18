const db = require("./database");

db.run(
    `
    ALTER TABLE sales
    ADD COLUMN cliente_id INTEGER
    `,
    (err) => {

        if (err) {
            console.log("Erro ao alterar tabela:", err.message);
            return;
        }

        console.log("Coluna cliente_id adicionada com sucesso!");

        db.close();
    }
);
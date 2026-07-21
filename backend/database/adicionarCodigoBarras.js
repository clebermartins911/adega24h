const db = require("../database");


db.run(
    `
    ALTER TABLE products 
    ADD COLUMN codigo_barras TEXT
    `,
    (err) => {

        if (err) {
            console.log("Erro:", err.message);
        } else {
            console.log("Campo codigo_barras criado com sucesso!");
        }

        db.close();

    }
);
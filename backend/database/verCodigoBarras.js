const db = require("../database");

db.all(
    `
    SELECT 
        id,
        nome,
        codigo_barras
    FROM products
    `,
    [],
    (err, produtos) => {

        if (err) {
            console.log(err);
            return;
        }

        console.log(produtos);
    }
);
const db = require("./database");

db.all(
    `
    SELECT 
        produto_id,
        COUNT(*) AS total
    FROM sales
    GROUP BY produto_id
    `,
    (err, vendas) => {
        if (err) console.log(err);
        else {
            console.log("Produtos com vendas:");
            console.table(vendas);
        }
    }
);

db.all(
    `
    SELECT 
        produto_id,
        COUNT(*) AS total
    FROM stock
    GROUP BY produto_id
    `,
    (err, estoque) => {
        if (err) console.log(err);
        else {
            console.log("Produtos com estoque:");
            console.table(estoque);
        }
    }
);

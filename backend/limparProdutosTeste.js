const db = require("./database");

const idsRemover = [2, 3, 4, 5, 7, 8, 12, 13, 14, 15, 19, 20, 21, 22, 23, 24];

db.run(
    `
    DELETE FROM products
    WHERE id IN (${idsRemover.join(",")})
    `,
    function (err) {
        if (err) {
            console.log("Erro:", err);
            return;
        }

        console.log("Produtos removidos:", this.changes);
        db.close();
    }
);

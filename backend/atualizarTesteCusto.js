const db = require("./database");

db.run(
    `
    UPDATE products
    SET custo = ?
    WHERE id = ?
    `,
    [5.50, 1],
    function (err) {
        if (err) {
            console.log("Erro:", err.message);
            return;
        }

        console.log("Produtos alterados:", this.changes);
        process.exit();
    }
);
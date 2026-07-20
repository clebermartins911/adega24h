const db = require("./database");

db.get(
    "SELECT * FROM products LIMIT 1",
    [],
    (err, row) => {
        if (err) {
            console.log("Erro:", err.message);
            return;
        }

        console.log("Produto encontrado:");
        console.log(row);

        process.exit();
    }
);
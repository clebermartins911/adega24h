const db = require("./database");

db.serialize(() => {
    db.run(
        `ALTER TABLE products
         ADD COLUMN estoque_minimo INTEGER DEFAULT 5`,
        (err) => {
            if (err) {
                console.error("Erro:", err.message);
            } else {
                console.log("Campo estoque_minimo criado com sucesso!");
            }

            db.close();
        }
    );
});

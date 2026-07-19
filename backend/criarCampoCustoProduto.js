const db = require("./database");

db.serialize(() => {
    db.run(
        `ALTER TABLE products 
         ADD COLUMN custo REAL DEFAULT 0`,
        (err) => {
            if (err) {
                console.error("Erro:", err.message);
            } else {
                console.log("Campo custo criado com sucesso!");
            }

            db.close();
        }
    );
});

const db = require("../database");

db.serialize(() => {
    db.run(
        `
        CREATE TABLE IF NOT EXISTS sale_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sale_id INTEGER NOT NULL,
            produto_id INTEGER NOT NULL,
            quantidade INTEGER NOT NULL,
            preco_unitario REAL NOT NULL,
            subtotal REAL NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (sale_id) REFERENCES sales(id),
            FOREIGN KEY (produto_id) REFERENCES products(id)
        );
    `,
        (err) => {
            if (err) {
                console.error("Erro ao criar sale_items:", err.message);
            } else {
                console.log("✅ Tabela sale_items criada com sucesso!");
            }

            db.close();
        }
    );
});

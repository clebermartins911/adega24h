const db = require("../database");

db.serialize(() => {
    db.run(
        `
        CREATE TABLE IF NOT EXISTS sales_v2 (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cliente_id INTEGER,
            valor_total REAL NOT NULL,
            forma_pagamento TEXT NOT NULL,
            data_venda TEXT DEFAULT CURRENT_TIMESTAMP
        );
    `,
        (err) => {
            if (err) {
                console.error("Erro ao criar sales_v2:", err.message);
            } else {
                console.log("✅ Tabela sales_v2 criada com sucesso!");
            }

            db.close();
        }
    );
});

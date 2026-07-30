const db = require("../database");

db.serialize(() => {
    db.run(
        `
        ALTER TABLE sale_items
        ADD COLUMN nome_produto TEXT
        `,
        (err) => {
            if (err) {
                // Se a coluna já existir, não interrompe o processo
                if (err.message.includes("duplicate column name")) {
                    console.log("ℹ️ A coluna nome_produto já existe.");
                } else {
                    console.error("Erro:", err.message);
                }
            } else {
                console.log("✅ Coluna nome_produto adicionada.");
            }

            db.close();
        }
    );
});

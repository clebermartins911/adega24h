const db = require("./database");

db.run(
    `
ALTER TABLE products 
ADD COLUMN obs TEXT
`,
    (err) => {
        if (err) {
            console.log("Erro:", err.message);
        } else {
            console.log("Campo OBS adicionado com sucesso!");
        }

        db.close();
    }
);

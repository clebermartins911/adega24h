const db = require("./database");

console.log("Verificando tabela products...");

db.all("PRAGMA table_info(products)", (err, rows) => {
    if (err) {
        console.log("Erro:", err.message);
        process.exit();
    }

    console.log("Colunas da tabela products:");
    console.log(rows);

    process.exit();
});

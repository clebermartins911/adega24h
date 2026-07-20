const db = require("./database");

db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tabelas) => {
    tabelas.forEach((tabela) => {
        db.all(`PRAGMA table_info(${tabela.name})`, (err, colunas) => {
            console.log("\nTabela:", tabela.name);
            console.table(colunas);
        });
    });
});

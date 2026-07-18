const db = require("./database");

db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, tabelas) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Tabelas existentes:");
    console.log(tabelas);

    db.close();
});

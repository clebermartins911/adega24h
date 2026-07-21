const db = require("../database");

db.all("PRAGMA table_info(products)", (err, colunas) => {

    if (err) {
        console.log(err);
    } else {
        console.log(colunas);
    }

    db.close();

});
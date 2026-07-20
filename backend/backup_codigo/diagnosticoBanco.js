const db = require("./database");

db.all("PRAGMA integrity_check;", [], (err, rows) => {
    if (err) {
        console.log(err);
    } else {
        console.log(rows);
    }

    db.close();
});

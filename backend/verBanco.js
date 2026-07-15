const db = require("./database");

db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
    if (err) {
        console.log(err);
    } else {
        console.log(rows);
    }

    db.close();
});
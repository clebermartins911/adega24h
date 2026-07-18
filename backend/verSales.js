const db = require("./database");

db.all("PRAGMA table_info(sales)", (err, rows) => {
    console.log(rows);
});

db.all("PRAGMA foreign_key_list(sales)", (err, rows) => {
    console.log("FOREIGN KEYS:");
    console.log(rows);
});
const db = require("./database");

db.all(
    "SELECT * FROM customers",
    [],
    (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(rows);
        db.close();
    }
);
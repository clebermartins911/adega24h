const db = require("../database");

const sql = `
UPDATE products
SET codigo_barras = ?
WHERE id = ?
`;

db.run(
    sql,
    [
        "7891991000012",
        1
    ],
    function(err){

        if(err){
            console.log(err);
            return;
        }

        console.log("Código cadastrado!");
        console.log("Produtos alterados:", this.changes);
    }
);
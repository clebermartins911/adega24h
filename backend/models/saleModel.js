const db = require("../database");


// Criar uma venda
function criarVenda(venda, callback) {

    const {
        cliente_id,
        produto_id,
        quantidade,
        total
    } = venda;


    db.run(
        `
       INSERT INTO sales 
(cliente_id, produto_id, quantidade, valor_total)
VALUES (?, ?, ?, ?)
        [
            cliente_id,
            produto_id,
            quantidade,
            total
        ],
        function(err) {

            if (err) {
                return callback(err);
            }

            callback(null, {
                id: this.lastID
            });

        }
    );

}


// Listar vendas
function listarVendas(callback) {

    db.all(
        "SELECT * FROM sales",
        [],
        (err, rows) => {

            if (err) {
                return callback(err);
            }

            callback(null, rows);

        }
    );

}


module.exports = {
    criarVenda,
    listarVendas
}; 
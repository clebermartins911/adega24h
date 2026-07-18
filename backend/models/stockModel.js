const db = require("../database");

// Listar estoque de todos os produtos
function listarEstoque(callback) {

    db.all(
        "SELECT id, nome, estoque FROM products",
        [],
        (err, produtos) => {

            if (err) {
                return callback(err);
            }

            callback(null, produtos);

        }
    );

}


// Buscar estoque por ID
function buscarPorId(id, callback) {

    db.get(
        "SELECT id, nome, estoque FROM products WHERE id = ?",
        [id],
        (err, produto) => {

            if (err) {
                return callback(err);
            }

            callback(null, produto);

        }
    );

}


// Entrada de estoque
function entradaEstoque(id, quantidade, callback) {

    db.run(
        "UPDATE products SET estoque = estoque + ? WHERE id = ?",
        [quantidade, id],
        function(err) {

            if (err) {
                return callback(err);
            }

            callback(null, {
                alterados: this.changes
            });

        }
    );

}


// Saída de estoque
function saidaEstoque(id, quantidade, callback) {

    db.run(
        `
        UPDATE products 
        SET estoque = estoque - ?
        WHERE id = ?
        AND estoque >= ?
        `,
        [
            quantidade,
            id,
            quantidade
        ],
        function(err) {

            if (err) {
                return callback(err);
            }

            callback(null, {
                alterados: this.changes
            });

        }
    );

}


module.exports = {
    listarEstoque,
    buscarPorId,
    entradaEstoque,
    saidaEstoque
};
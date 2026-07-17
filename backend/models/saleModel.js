const db = require("../database");

// Criar uma venda
function criarVenda(venda, callback) {

    const {
        cliente_id,
        produto_id,
        quantidade,
        valor_total
    } = venda;


    db.run(
        `
        INSERT INTO sales
        (cliente_id, produto_id, quantidade, valor_total)
        VALUES (?, ?, ?, ?)
        `,
        [
            cliente_id,
            produto_id,
            quantidade,
            valor_total
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


module.exports = {
    criarVenda,
    listarVendas
}; 
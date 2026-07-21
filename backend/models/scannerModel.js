const db = require("../database");

function buscarPorCodigo(codigo, callback) {
    const sql = `
        SELECT 
            id,
            nome,
            preco,
            estoque,
            obs
        FROM products
        WHERE codigo_barras = ?
    `;

    db.get(sql, [codigo], (err, produto) => {
        if (err) {
            return callback(err, null);
        }

        callback(null, produto);
    });
}

module.exports = {
    buscarPorCodigo,
};

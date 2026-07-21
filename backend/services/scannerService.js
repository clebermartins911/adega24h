const scannerModel = require("../models/scannerModel");

function lerCodigo(codigo, callback) {
    scannerModel.buscarPorCodigo(codigo, (err, produto) => {
        if (err) {
            return callback({
                erro: "Erro ao buscar produto",
            });
        }

        if (!produto) {
            return callback({
                erro: "Produto não encontrado",
            });
        }

        callback(null, produto);
    });
}

module.exports = {
    lerCodigo,
};

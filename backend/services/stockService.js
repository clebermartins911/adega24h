const stockModel = require("../models/stockModel");


// Listar estoque
function listarEstoque(callback) {

    stockModel.listarEstoque(callback);

}


// Buscar estoque por ID
function buscarPorId(id, callback) {

    stockModel.buscarPorId(id, callback);

}


// Entrada de estoque
function entradaEstoque(id, quantidade, callback) {

    if (!quantidade || quantidade <= 0) {
        return callback({
            erro: "Quantidade inválida"
        });
    }


    stockModel.entradaEstoque(
        id,
        quantidade,
        callback
    );

}


// Saída de estoque
function saidaEstoque(id, quantidade, callback) {

    if (!quantidade || quantidade <= 0) {
        return callback({
            erro: "Quantidade inválida"
        });
    }


    stockModel.saidaEstoque(
        id,
        quantidade,
        callback
    );

}


module.exports = {
    listarEstoque,
    buscarPorId,
    entradaEstoque,
    saidaEstoque
};
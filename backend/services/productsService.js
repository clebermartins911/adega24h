const productModel = require("../models/productModel");

// Criar produto
function criarProduto(dadosProduto, callback) {
    const { nome, preco, estoque, categoria } = dadosProduto;

    if (!nome) {
        return callback({
            erro: "Nome do produto é obrigatório",
        });
    }

    if (preco <= 0) {
        return callback({
            erro: "Preço inválido",
        });
    }

    if (estoque < 0) {
        return callback({
            erro: "Estoque inválido",
        });
    }

    productModel.buscarCategoriaId(categoria, (err, categoria_id) => {
        if (err) {
            return callback(err);
        }

        if (!categoria_id) {
            return callback({
                erro: "Categoria não encontrada",
            });
        }

        productModel.criarProduto(
            {
                nome,
                preco,
                estoque,
                categoria_id,
            },
            callback
        );
    });
}

// Listar produtos
function listarProdutos(callback) {
    productModel.listarProdutos(callback);
}
// Atualizar produto
function atualizarProduto(id, dadosProduto, callback) {
    const { nome, preco, estoque, categoria } = dadosProduto;

    if (!nome) {
        return callback({
            erro: "Nome do produto é obrigatório",
        });
    }

    if (preco <= 0) {
        return callback({
            erro: "Preço inválido",
        });
    }

    if (estoque < 0) {
        return callback({
            erro: "Estoque inválido",
        });
    }

    productModel.buscarCategoriaId(categoria, (err, categoria_id) => {
        if (err) {
            return callback(err);
        }

        if (!categoria_id) {
            return callback({
                erro: "Categoria não encontrada",
            });
        }

        productModel.atualizarProduto(
            id,
            {
                nome,
                preco,
                estoque,
                categoria_id,
            },
            callback
        );
    });
}
// Buscar produto por ID
function buscarPorId(id, callback) {
    productModel.buscarPorId(id, callback);
}
function excluirProduto(id, callback) {
    productModel.excluirProduto(id, callback);
}
module.exports = {
    criarProduto,
    listarProdutos,
    buscarPorId,
    atualizarProduto,
    excluirProduto,
};

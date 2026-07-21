const cartModel = require("./model");

function adicionarProduto(produto) {
    if (!produto.produto_id) {
        throw new Error("Produto inválido");
    }

    if (!produto.quantidade || produto.quantidade <= 0) {
        throw new Error("Quantidade inválida");
    }

    return cartModel.adicionarItem(produto);
}

function listarCarrinho() {
    return {
        itens: cartModel.listarItens(),

        total: cartModel.calcularTotal(),
    };
}

function removerProduto(produto_id) {
    return cartModel.removerItem(produto_id);
}

function limpar() {
    return cartModel.limparCarrinho();
}

module.exports = {
    adicionarProduto,

    listarCarrinho,

    removerProduto,

    limpar,
};

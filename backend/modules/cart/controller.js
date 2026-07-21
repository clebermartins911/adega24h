const cartService = require("./service");

function adicionarProduto(req, res) {
    try {
        const produto = req.body;

        const item = cartService.adicionarProduto(produto);

        res.json({
            mensagem: "Produto adicionado ao carrinho",

            item,
        });
    } catch (erro) {
        res.status(400).json({
            erro: erro.message,
        });
    }
}

function listarCarrinho(req, res) {
    try {
        const carrinho = cartService.listarCarrinho();

        res.json(carrinho);
    } catch (erro) {
        res.status(500).json({
            erro: erro.message,
        });
    }
}

function removerProduto(req, res) {
    try {
        const id = Number(req.params.id);

        cartService.removerProduto(id);

        res.json({
            mensagem: "Produto removido do carrinho",
        });
    } catch (erro) {
        res.status(400).json({
            erro: erro.message,
        });
    }
}

function limparCarrinho(req, res) {
    try {
        cartService.limpar();

        res.json({
            mensagem: "Carrinho limpo",
        });
    } catch (erro) {
        res.status(500).json({
            erro: erro.message,
        });
    }
}

module.exports = {
    adicionarProduto,

    listarCarrinho,

    removerProduto,

    limparCarrinho,
};

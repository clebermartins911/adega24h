const stockService = require("../services/stockService");

// Listar estoque
function listarEstoque(req, res) {
    stockService.listarEstoque((err, produtos) => {
        if (err) {
            return res.status(500).json({
                erro: err.message,
            });
        }

        res.json(produtos);
    });
}

// Buscar estoque por ID
function buscarPorId(req, res) {
    const id = req.params.id;

    stockService.buscarPorId(id, (err, produto) => {
        if (err) {
            return res.status(500).json({
                erro: err.message,
            });
        }

        if (!produto) {
            return res.status(404).json({
                erro: "Produto não encontrado",
            });
        }

        res.json(produto);
    });
}

// Entrada de estoque
function entradaEstoque(req, res) {
    const id = req.params.id;
    const { quantidade } = req.body;

    stockService.entradaEstoque(id, quantidade, (err, resultado) => {
        if (err) {
            return res.status(400).json(err);
        }

        if (resultado.alterados === 0) {
            return res.status(404).json({
                erro: "Produto não encontrado",
            });
        }

        res.json({
            mensagem: "Estoque atualizado com sucesso!",
        });
    });
}

// Saída de estoque
function saidaEstoque(req, res) {
    const id = req.params.id;
    const { quantidade } = req.body;

    stockService.saidaEstoque(id, quantidade, (err, resultado) => {
        if (err) {
            return res.status(400).json(err);
        }

        if (resultado.alterados === 0) {
            return res.status(400).json({
                erro: "Estoque insuficiente ou produto inexistente",
            });
        }

        res.json({
            mensagem: "Saída de estoque realizada!",
        });
    });
}

module.exports = {
    listarEstoque,
    buscarPorId,
    entradaEstoque,
    saidaEstoque,
};

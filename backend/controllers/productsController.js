const productsService = require("../services/productsService");


// Criar produto
function criarProduto(req, res) {

    productsService.criarProduto(
        req.body,
        (err, resultado) => {

            if (err) {
                return res.status(400).json(err);
            }


            res.status(201).json({
                mensagem: "Produto cadastrado com sucesso!",
                produto: resultado
            });

        }
    );

}


// Listar produtos
function listarProdutos(req, res) {

    productsService.listarProdutos(
        (err, produtos) => {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }


            res.json(produtos);

        }
    );

}

// Buscar produto por ID
function buscarPorId(req, res) {

    const id = req.params.id;

    productsService.buscarPorId(id, (err, produto) => {

        if (err) {
            return res.status(500).json({
                erro: err.message
            });
        }

        if (!produto) {
            return res.status(404).json({
                erro: "Produto não encontrado"
            });
        }

        res.json(produto);

    });
// Atualizar produto
function atualizarProduto(req, res) {

    const id = req.params.id;

    productsService.atualizarProduto(
        id,
        req.body,
        (err, resultado) => {

            if (err) {
                return res.status(400).json(err);
            }


            if (resultado.alterados === 0) {
                return res.status(404).json({
                    erro: "Produto não encontrado"
                });
            }


            res.json({
                mensagem: "Produto atualizado com sucesso!"
            });

        }
    );
// Excluir produto
function excluirProduto(req, res) {

    const id = req.params.id;

    productsService.excluirProduto(
        id,
        (err, resultado) => {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }


            if (resultado.removidos === 0) {
                return res.status(404).json({
                    erro: "Produto não encontrado"
                });
            }


            res.json({
                mensagem: "Produto removido com sucesso!"
            });

        }
    );

}
}
}
module.exports = {
    criarProduto,
    listarProdutos,
    buscarPorId,
    atualizarProduto,
    excluirProduto
};
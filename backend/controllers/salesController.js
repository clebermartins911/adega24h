const vendasService = require("../services/vendasService");


// Criar venda
function criarVenda(req, res) {

    const dadosVenda = req.body;


    vendasService.criarVenda(
        dadosVenda,
        (err, resultado) => {

            if (err) {
                return res.status(400).json(err);
            }


            res.status(201).json({
                mensagem: "Venda criada com sucesso!",
                venda: resultado
            });

        }
    );

}


// Listar vendas
function listarVendas(req, res) {

    vendasService.listarVendas(
        (err, vendas) => {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }


            res.json(vendas);

        }
    );

}


module.exports = {
    criarVenda,
    listarVendas
};
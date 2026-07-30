const vendasServiceV2 = require("../services/vendasServiceV2");

/**
 * Criar nova venda
 */
function criarVenda(req, res) {
    vendasServiceV2.criarVenda(req.body, (err, resultado) => {
        if (err) {
            return res.status(400).json(err);
        }

        return res.status(201).json(resultado);
    });
}

module.exports = {
    criarVenda,
};

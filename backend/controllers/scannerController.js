const scannerService = require("../services/scannerService");

function lerCodigo(req, res) {
    const { codigo } = req.body;

    if (!codigo) {
        return res.status(400).json({
            erro: "Código não informado",
        });
    }

    scannerService.lerCodigo(codigo, (err, produto) => {
        if (err) {
            return res.status(404).json(err);
        }

        res.json(produto);
    });
}

module.exports = {
    lerCodigo,
};

console.log("VALIDAR PRODUTO NOVO CARREGADO");
function validarProduto(req, res, next) {
    console.log("BODY RECEBIDO NO MIDDLEWARE:", req.body);

    const { nome, preco, estoque, categoria, categoria_id } = req.body;

    if (!nome) {
        return res.status(400).json({
            erro: "Nome do produto é obrigatório",
        });
    }

    if (preco === undefined || preco <= 0) {
        return res.status(400).json({
            erro: "Preço deve ser maior que zero",
        });
    }

    if (estoque === undefined || estoque < 0) {
        return res.status(400).json({
            erro: "Estoque inválido",
        });
    }

    // Aceita categoria_id (padrão do banco)
    // ou categoria (compatibilidade antiga)

    if (!categoria_id && !categoria) {
        return res.status(400).json({
            erro: "Categoria é obrigatória",
        });
    }

    next();
}

module.exports = validarProduto;

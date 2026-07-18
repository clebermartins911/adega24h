const supplierModel = require("../models/supplierModel");

// Criar fornecedor
function criarFornecedor(req, res) {
    supplierModel.criarFornecedor(req.body, (err, resultado) => {
        if (err) {
            return res.status(500).json({
                erro: "Erro ao cadastrar fornecedor",
            });
        }

        res.status(201).json({
            mensagem: "Fornecedor cadastrado com sucesso!",
            id: resultado.id,
        });
    });
}

// Listar fornecedores
function listarFornecedores(req, res) {
    supplierModel.listarFornecedores((err, fornecedores) => {
        if (err) {
            return res.status(500).json({
                erro: "Erro ao listar fornecedores",
            });
        }

        res.json(fornecedores);
    });
}

module.exports = {
    criarFornecedor,
    listarFornecedores,
};

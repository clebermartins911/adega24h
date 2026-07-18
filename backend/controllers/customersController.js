const customerModel = require("../models/customerModel");

// Criar cliente
function criarCliente(req, res) {
    customerModel.criarCliente(req.body, (err, resultado) => {
        if (err) {
            return res.status(500).json({
                erro: "Erro ao cadastrar cliente",
            });
        }

        res.status(201).json({
            mensagem: "Cliente cadastrado com sucesso!",
            id: resultado.id,
        });
    });
}

// Listar clientes
function listarClientes(req, res) {
    customerModel.listarClientes((err, clientes) => {
        if (err) {
            return res.status(500).json({
                erro: "Erro ao listar clientes",
            });
        }

        res.json(clientes);
    });
}

module.exports = {
    criarCliente,
    listarClientes,
};

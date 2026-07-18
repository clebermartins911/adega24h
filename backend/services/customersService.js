const customerModel = require("../models/customerModel");

// Criar cliente
function criarCliente(dadosCliente, callback) {
    const { nome, telefone, email } = dadosCliente;

    // Validação

    if (!nome) {
        return callback({
            erro: "Nome do cliente é obrigatório",
        });
    }

    customerModel.criarCliente(
        {
            nome,
            telefone,
            email,
        },
        callback
    );
}

// Listar clientes
function listarClientes(callback) {
    customerModel.listarClientes(callback);
}

module.exports = {
    criarCliente,
    listarClientes,
};

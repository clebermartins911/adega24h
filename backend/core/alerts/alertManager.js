const alertTypes = require("./alertTypes");

function createAlert(type, message) {
    return {
        tipo: type,
        mensagem: message,
        data: new Date(),
    };
}

function estoqueBaixo(produto, quantidade) {
    return createAlert(
        alertTypes.ESTOQUE_BAIXO,
        `Estoque baixo: ${produto}. Quantidade atual: ${quantidade}`
    );
}

module.exports = {
    createAlert,
    estoqueBaixo,
};

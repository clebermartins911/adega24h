function gerarPix(valor) {
    return {
        tipo: "PIX",
        valor,
        status: "aguardando pagamento",
    };
}

function confirmarPix(id) {
    return {
        id,
        status: "pagamento confirmado",
    };
}

module.exports = {
    gerarPix,
    confirmarPix,
};

function imprimirCupom(cupom) {
    console.log("IMPRESSÃO:", cupom);

    return {
        enviado: true,
    };
}

module.exports = {
    imprimirCupom,
};

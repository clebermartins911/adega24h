const moduleRegistry = {
    PDV: {
        funcionarios: true,
        caixa: true,
        delivery: true,
        comissoes: true,
    },

    AUTO: {
        porta: false,
        fechaduras: false,
        sensores: false,
        cameras: false,
        qrCode: false,
    },

    ENTERPRISE: {
        franquias: false,
        multilojas: false,
        dashboard: false,
        bi: false,
    },
};

module.exports = moduleRegistry;

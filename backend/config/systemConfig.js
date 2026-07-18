const systemConfig = {
    nomeSistema: "Adega24h System",
    tipoSistema: "store",

    recursos: {
        estoque: true,
        vendas: true,
        clientes: true,
        fornecedores: true,
        funcionarios: false,
        sensores: false,
        inteligenciaArtificial: false,
    },

    versao: "1.0.0",
};

module.exports = systemConfig;

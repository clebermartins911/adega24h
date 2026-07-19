module.exports = {
    // Dados do comércio
    nomeComercio: "Novo Comércio",
    nomeFantasia: "",
    cnpj: "",
    razaoSocial: "",

    // Contato
    telefone: "",
    whatsapp: "",
    email: "",

    // Endereço
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",

    // Funcionamento
    horarioAbertura: "08:00",
    horarioFechamento: "23:59",

    // Identidade visual
    logo: "",
    corPrincipal: "",

    // Pagamentos aceitos
    pagamentos: {
        dinheiro: true,
        pix: true,
        cartao: true,
    },

    // Fiscal opcional
    fiscal: {
        habilitado: false,
        emitirNotaFiscal: false,
        emitirCupomFiscal: false,
        regimeTributario: "",
    },

    // Alertas do sistema
    alertas: {
        estoqueBaixo: true,
        produtoVencendo: true,
        resumoDiario: true,
    },

    // Financeiro
    financeiro: {
        calcularImpostos: true,
        mostrarLucro: true,
    },

    mensagemRodape: "Obrigado pela preferência!",
};

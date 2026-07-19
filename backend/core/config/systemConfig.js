const systemConfig = {
    systemName: "Adega24hSystem",
    version: "2.0.0",

    edition: "PDV", // PDV | AUTO | ENTERPRISE

    modules: {
        products: true,
        categories: true,
        stock: true,
        sales: true,
        customers: true,
        suppliers: true,
        finance: true,
        reports: true,

        pdv: true,
        auto: false,
        enterprise: false,
    },
};

module.exports = systemConfig;

const express = require("express");
const cors = require("cors");
const path = require("path");

const systemConfig = require("./core/config/systemConfig");
const storeConfig = require("./core/config/storeConfig");
const businessConfig = require("./core/config/businessConfig");
const { getActiveModules } = require("./core/utils/moduleLoader");

const app = express();

app.use(cors());
app.use(express.json());

// ===============================
// FRONTEND
// ===============================

app.use(express.static(path.join(__dirname, "frontend")));

console.log("FRONTEND CARREGADO:", path.join(__dirname, "frontend"));

// ===============================
// ADMIN
// ===============================

app.get("/admin", (req, res) => {
    console.log("ENTROU NA ROTA ADMIN");

    res.sendFile(path.join(__dirname, "frontend", "admin", "index.html"));
});
console.log("ROTA ADMIN FOI REGISTRADA");

console.log("ADMIN CARREGADO:", path.join(__dirname, "frontend/admin"));

// ===============================
// ROTAS DO CORE
// ===============================

const productRoutes = require("./routes/products");
const salesRoutes = require("./routes/sales");
const categoryRoutes = require("./routes/categories");
const stockRoutes = require("./routes/stock");
const customerRoutes = require("./routes/customers");
const supplierRoutes = require("./routes/suppliers");
const editionRoutes = require("./routes/edition");
const scannerRoutes = require("./routes/scanner");
const autoRoutes = require("./routes/auto");
const alertRoutes = require("./routes/alerts");

// ===============================
// REGISTRO DAS ROTAS
// ===============================

app.use("/products", productRoutes);
app.use("/sales", salesRoutes);
app.use("/categories", categoryRoutes);
app.use("/stock", stockRoutes);
app.use("/customers", customerRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/edition", editionRoutes);
app.use("/auto", autoRoutes);
app.use("/alerts", alertRoutes);
app.use("/scanner", scannerRoutes);

// DEBUG DAS ROTAS

console.log("SCANNER STACK:");

scannerRoutes.stack.forEach((r) => {
    console.log(r.route.path, Object.keys(r.route.methods));
});

console.log(
    "EDITION ROTAS:",
    editionRoutes.stack.map((r) => r.route.path)
);

console.log(
    "AUTO ROTAS:",
    autoRoutes.stack.map((r) => r.route.path)
);

// ===============================
// ROTAS DO SISTEMA
// ===============================

app.get("/status", (req, res) => {
    const config = getActiveModules();

    res.json({
        sistema: systemConfig.systemName,

        comercio: storeConfig.nomeComercio,

        tipo_comercio: businessConfig.tipoComercio,

        cnpj: storeConfig.cnpj,

        edicao: config.edition,

        status: "Online",

        modulos: config.modules,

        features: config.features,
    });
});

app.get("/teste", (req, res) => {
    res.json({
        mensagem: "Servidor funcionando",
    });
});

app.get("/debug", (req, res) => {
    res.json({
        customers: "OK",

        suppliers: "OK",
    });
});

// ===============================
// INICIALIZAÇÃO
// ===============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    const config = getActiveModules();

    console.log("");

    console.log("======================================");

    console.log(`Sistema : ${systemConfig.systemName}`);

    console.log(`Versão  : ${systemConfig.version}`);

    console.log(`Edição  : ${config.edition}`);

    console.log("======================================");

    console.log(`Servidor rodando em http://localhost:${PORT}`);

    console.log("======================================");
});

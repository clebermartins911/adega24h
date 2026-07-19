const express = require("express");
const cors = require("cors");

const systemConfig = require("./core/config/systemConfig");
const { getActiveModules } = require("./core/utils/moduleLoader");

const app = express();

app.use(cors());
app.use(express.json());

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
const autoRoutes = require("./routes/auto");
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
    console.log("STATUS CONFIG:", config);
    res.json({
        sistema: systemConfig.systemName,
        versao: systemConfig.version,
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
// INICIALIZAÇÃO DO SERVIDOR
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

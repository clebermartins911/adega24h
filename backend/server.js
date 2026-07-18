const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Importa as rotas
const productRoutes = require("./routes/products");
console.log("ROTA PRODUTOS CARREGADA");
const salesRoutes = require("./routes/sales");
const categoryRoutes = require("./routes/categories");
const stockRoutes = require("./routes/stock");
console.log("ROTA ESTOQUE CARREGADA");
const customerRoutes = require("./routes/customers");
const supplierRoutes = require("./routes/suppliers");
console.log("ROTAS CLIENTES E FORNECEDORES CARREGADAS");
// Usa as rotas
app.use("/products", productRoutes);
app.use("/sales", salesRoutes);
app.use("/categories", categoryRoutes);
app.use("/stock", stockRoutes);
app.use("/customers", customerRoutes);
console.log(
    "CUSTOMERS ROTAS:",
    customerRoutes.stack.map((r) => r.route.path)
);
console.log("CUSTOMERS REGISTRADO NO APP");
app.use("/suppliers", supplierRoutes);
console.log(
    "SUPPLIERS ROTAS:",
    supplierRoutes.stack.map((r) => r.route.path)
);
console.log("SUPPLIERS REGISTRADO NO APP");

// Rota de status
app.get("/status", (req, res) => {
    res.json({
        sistema: "Adega 24h",
        status: "Online",
        versao: "1.0.0",
    });
});

app.get("/teste", (req, res) => {
    res.json({
        mensagem: "Servidor novo funcionando",
    });
});
const PORT = 3000;
app.get("/debug", (req, res) => {
    res.json({
        customers: "teste",
        suppliers: "teste",
    });
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

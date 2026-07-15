const express = require("express");
const cors = require("cors");
const db = require("./database");
const app = express();

app.use(cors());
app.use(express.json());


// Importa as rotas
const productRoutes = require("./routes/products");
console.log("ROTA PRODUTOS CARREGADA");
const salesRoutes = require("./routes/sales");
const categoryRoutes = require("./routes/categories");


// Usa as rotas
app.use("/products", productRoutes);
app.use("/sales", salesRoutes);
app.use("/categories", categoryRoutes);


// Rota de status
app.get("/status", (req, res) => {
    res.json({
        sistema: "Adega 24h",
        status: "Online",
        versao: "1.0.0"
    });
});

app.get("/teste", (req, res) => {
    res.json({
        mensagem: "Servidor novo funcionando"
    });
});
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


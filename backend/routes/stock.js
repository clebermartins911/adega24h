const express = require("express");
const router = express.Router();

const stockController = require("../controllers/stockController");

console.log("stock.js carregado");

// Listar estoque
router.get("/", stockController.listarEstoque);

// Buscar estoque por ID
router.get("/:id", stockController.buscarPorId);

// Entrada de estoque
router.put("/entrada/:id", stockController.entradaEstoque);

// Saída de estoque
router.put("/saida/:id", stockController.saidaEstoque);

module.exports = router;

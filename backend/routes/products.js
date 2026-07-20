const express = require("express");
const router = express.Router();

const validarProduto = require("../middleware/validarProduto");
const productsController = require("../controllers/productsController");

console.log("products.js carregado");

// Listar todos os produtos
router.get("/", productsController.listarProdutos);

// Buscar produto por ID
router.get("/:id", productsController.buscarPorId);

// Cadastrar produto
router.post("/", validarProduto, productsController.criarProduto);

// Atualizar produto
router.put("/:id", validarProduto, productsController.atualizarProduto);

// Excluir produto
router.delete("/:id", productsController.excluirProduto);

module.exports = router;

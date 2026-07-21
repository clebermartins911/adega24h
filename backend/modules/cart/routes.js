const express = require("express");

const router = express.Router();

const cartController = require("./controller");

router.post("/add", cartController.adicionarProduto);

router.get("/", cartController.listarCarrinho);

router.delete("/:id", cartController.removerProduto);

router.delete("/", cartController.limparCarrinho);

module.exports = router;

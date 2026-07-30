const express = require("express");
const router = express.Router();

const salesControllerV2 = require("../controllers/salesControllerV2");

// Criar nova venda
router.post("/", salesControllerV2.criarVenda);

module.exports = router;

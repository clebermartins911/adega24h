const express = require("express");
const router = express.Router();

const salesController = require("../controllers/salesController");

console.log("sales.js usando controller");

router.post("/", salesController.criarVenda);

router.get("/", salesController.listarVendas);

module.exports = router;

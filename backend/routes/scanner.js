const express = require("express");
const router = express.Router();

const scannerController = require("../controllers/scannerController");

console.log("scanner.js carregado");

router.get("/", (req, res) => {
    res.json({
        status: "Scanner funcionando"
    });
});

router.post("/read", scannerController.lerCodigo);

module.exports = router;
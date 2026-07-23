const express = require("express");

const router = express.Router();

console.log("ADMIN ROUTE CARREGADO");

router.get("/", (req, res) => {
    res.json({
        mensagem: "Admin funcionando",
    });
});

router.get("/clientes", (req, res) => {
    res.json({
        mensagem: "Clientes funcionando",
    });
});

module.exports = router;

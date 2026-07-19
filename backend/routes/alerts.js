const express = require("express");
const router = express.Router();

const alertManager = require("../core/alerts/alertManager");

router.get("/", (req, res) => {
    const alerta = alertManager.estoqueBaixo("Produto teste", 5);

    res.json({
        sistema: "Adega24hSystem",
        alertas: [alerta],
    });
});

module.exports = router;

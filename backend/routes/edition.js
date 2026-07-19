const express = require("express");
const router = express.Router();
console.log("edition.js carregado");
const { loadEditionModule } = require("../core/utils/moduleResolver");

router.get("/", (req, res) => {
    const edition = loadEditionModule();

    res.json({
        sistema: edition.name,
        edicao: edition.edition,
    });
});

module.exports = router;

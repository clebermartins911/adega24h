const express = require("express");
const router = express.Router();

const db = require("../database");
console.log("SALES NOVO CARREGADO");

// Registrar uma venda
router.post("/", (req, res) => {
console.log("ENTROU NA ROTA NOVA DE SALES");
    const { produto_id, quantidade, valor_total } = req.body;


    const sql = `
        INSERT INTO sales 
        (produto_id, quantidade, valor_total, data_venda)
        VALUES (?, ?, ?, datetime('now'))
    `;


    db.run(
        sql,
        [produto_id, quantidade, valor_total],
        function (err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }


            res.json({
                mensagem: "Venda registrada com sucesso!",
                id_venda: this.lastID
            });

        }
    );

});



// Consultar todas as vendas
router.get("/", (req, res) => {


    const sql = `
        SELECT * FROM sales
    `;


    db.all(sql, [], (err, rows) => {


        if (err) {

            return res.status(500).json({
                erro: err.message
            });

        }


        res.json(rows);


    });


});



module.exports = router;
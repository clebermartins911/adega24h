const express = require("express");
const router = express.Router();
const db = require("../database");

console.log("stock.js carregado");


// Consultar estoque de todos os produtos
router.get("/", (req, res) => {

    db.all(
        "SELECT id, nome, estoque FROM products",
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            res.json(rows);

        }
    );

});


// Buscar estoque de um produto por ID
router.get("/:id", (req, res) => {

    const id = req.params.id;


    db.get(
        "SELECT id, nome, estoque FROM products WHERE id = ?",
        [id],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }


            if (!row) {
                return res.status(404).json({
                    erro: "Produto não encontrado"
                });
            }


            res.json(row);

        }
    );

});


// Entrada de estoque
router.put("/entrada/:id", (req, res) => {

    const id = req.params.id;
    const { quantidade } = req.body;


    if (!quantidade || quantidade <= 0) {
        return res.status(400).json({
            erro: "Quantidade inválida"
        });
    }


    db.run(
        "UPDATE products SET estoque = estoque + ? WHERE id = ?",
        [quantidade, id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }


            if (this.changes === 0) {
                return res.status(404).json({
                    erro: "Produto não encontrado"
                });
            }


            res.json({
                mensagem: "Estoque atualizado com sucesso!"
            });

        }
    );

});


// Saída de estoque
router.put("/saida/:id", (req, res) => {

    const id = req.params.id;
    const { quantidade } = req.body;


    if (!quantidade || quantidade <= 0) {
        return res.status(400).json({
            erro: "Quantidade inválida"
        });
    }


    db.run(
        "UPDATE products SET estoque = estoque - ? WHERE id = ?",
        [quantidade, id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }


            if (this.changes === 0) {
                return res.status(404).json({
                    erro: "Produto não encontrado"
                });
            }


            res.json({
                mensagem: "Saída de estoque realizada!"
            });

        }
    );

});


module.exports = router;
const express = require("express");
const router = express.Router();
const db = require("../database");

console.log("categories.js carregado");


// Listar todas as categorias
router.get("/", (req, res) => {

    db.all("SELECT * FROM categories", [], (err, rows) => {

        if (err) {
            return res.status(500).json({
                erro: err.message
            });
        }

        res.json(rows);
    });

});


// Buscar categoria por ID
router.get("/:id", (req, res) => {

    const id = req.params.id;

    db.get(
        "SELECT * FROM categories WHERE id = ?",
        [id],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    erro: "Categoria não encontrada"
                });
            }

            res.json(row);

        }
    );

});


// Cadastrar categoria
router.post("/", (req, res) => {

    const { nome } = req.body;


    if (!nome) {
        return res.status(400).json({
            erro: "Nome da categoria é obrigatório"
        });
    }


    db.run(
        "INSERT INTO categories (nome) VALUES (?)",
        [nome],
        function(err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }


            res.status(201).json({
                mensagem: "Categoria cadastrada com sucesso!",
                categoria: {
                    id: this.lastID,
                    nome
                }
            });

        }
    );

});


// Atualizar categoria
router.put("/:id", (req, res) => {

    const id = req.params.id;
    const { nome } = req.body;


    db.run(
        "UPDATE categories SET nome = ? WHERE id = ?",
        [nome, id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }


            if (this.changes === 0) {
                return res.status(404).json({
                    erro: "Categoria não encontrada"
                });
            }


            res.json({
                mensagem: "Categoria atualizada com sucesso!"
            });

        }
    );

});


// Excluir categoria
router.delete("/:id", (req, res) => {

    const id = req.params.id;


    db.run(
        "DELETE FROM categories WHERE id = ?",
        [id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }


            if (this.changes === 0) {
                return res.status(404).json({
                    erro: "Categoria não encontrada"
                });
            }


            res.json({
                mensagem: "Categoria removida com sucesso!"
            });

        }
    );

});


module.exports = router;
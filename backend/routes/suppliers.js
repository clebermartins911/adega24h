const express = require("express");
const router = express.Router();
const db = require("../database");

console.log("suppliers.js carregado");


// Listar todos os fornecedores
router.get("/", (req, res) => {

    db.all("SELECT * FROM suppliers", [], (err, rows) => {

        if (err) {
            return res.status(500).json({
                erro: err.message
            });
        }

        res.json(rows);
    });

});


// Buscar fornecedor por ID
router.get("/:id", (req, res) => {

    const id = req.params.id;

    db.get(
        "SELECT * FROM suppliers WHERE id = ?",
        [id],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    erro: "Fornecedor não encontrado"
                });
            }

            res.json(row);

        }
    );

});


// Cadastrar fornecedor
router.post("/", (req, res) => {

    const { nome, telefone, email } = req.body;


    if (!nome) {
        return res.status(400).json({
            erro: "Nome do fornecedor é obrigatório"
        });
    }


    db.run(
        "INSERT INTO suppliers (nome, telefone, email) VALUES (?, ?, ?)",
        [nome, telefone, email],
        function(err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }


            res.status(201).json({
                mensagem: "Fornecedor cadastrado com sucesso!",
                fornecedor: {
                    id: this.lastID,
                    nome,
                    telefone,
                    email
                }
            });

        }
    );

});


// Atualizar fornecedor
router.put("/:id", (req, res) => {

    const id = req.params.id;
    const { nome, telefone, email } = req.body;


    db.run(
        "UPDATE suppliers SET nome = ?, telefone = ?, email = ? WHERE id = ?",
        [nome, telefone, email, id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }


            if (this.changes === 0) {
                return res.status(404).json({
                    erro: "Fornecedor não encontrado"
                });
            }


            res.json({
                mensagem: "Fornecedor atualizado com sucesso!"
            });

        }
    );

});


// Excluir fornecedor
router.delete("/:id", (req, res) => {

    const id = req.params.id;


    db.run(
        "DELETE FROM suppliers WHERE id = ?",
        [id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }


            if (this.changes === 0) {
                return res.status(404).json({
                    erro: "Fornecedor não encontrado"
                });
            }


            res.json({
                mensagem: "Fornecedor removido com sucesso!"
            });

        }
    );

});


module.exports = router;
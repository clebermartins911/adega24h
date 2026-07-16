const express = require("express");
const router = express.Router();
const db = require("../database");

console.log("customers.js carregado");


// Cadastrar cliente
router.post("/", (req, res) => {

    const { nome, telefone, email } = req.body;

    if (!nome) {
        return res.status(400).json({
            erro: "Nome do cliente é obrigatório"
        });
    }

    db.run(
        `
        INSERT INTO customers (nome, telefone, email)
        VALUES (?, ?, ?)
        `,
        [nome, telefone, email],
        function(err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            res.json({
                mensagem: "Cliente cadastrado com sucesso!",
                id: this.lastID
            });

        }
    );

});


// Listar clientes
router.get("/", (req, res) => {

    db.all(
        "SELECT * FROM customers",
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
console.log("Arquivo customers iniciado");
console.log("ROTAS CUSTOMERS REGISTRADAS");
console.log("Exportando rota customers");
console.log(router.stack.map(r => r.route?.path));
module.exports = router;
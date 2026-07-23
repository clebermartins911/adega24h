const express = require("express");
const router = express.Router();
const db = require("../database");

console.log("caixas.js carregado");
console.log("TESTE ROTAS CAIXA ABRIR EXISTE");

// Listar caixas
router.get("/", (req, res) => {
    db.all("SELECT * FROM caixas", [], (erro, caixas) => {
        if (erro) {
            return res.status(500).json({
                erro: erro.message,
            });
        }

        res.json(caixas);
    });
});

// Cadastrar caixa
router.post("/", (req, res) => {
    const { codigo, nome } = req.body;

    if (!codigo || !nome) {
        return res.status(400).json({
            erro: "Código e nome do caixa são obrigatórios",
        });
    }

    db.run(
        `
        INSERT INTO caixas
        (
            codigo,
            nome
        )
        VALUES (?,?)
        `,
        [codigo, nome],

        function (erro) {
            if (erro) {
                return res.status(500).json({
                    erro: erro.message,
                });
            }

            res.status(201).json({
                mensagem: "Caixa cadastrado com sucesso!",

                caixa: {
                    id: this.lastID,
                    codigo,
                    nome,
                    status: "FECHADO",
                },
            });
        }
    );
});

// Abrir caixa
router.post("/:id/abrir", (req, res) => {
    const id = req.params.id;

    const agora = new Date().toISOString();

    db.run(
        `
        UPDATE caixas
        SET 
            status = 'ABERTO',
            aberto_em = ?
        WHERE id = ?
        `,
        [agora, id],

        function (erro) {
            if (erro) {
                return res.status(500).json({
                    erro: erro.message,
                });
            }

            res.json({
                mensagem: "Caixa aberto com sucesso!",
                id,
            });
        }
    );
});

// Fechar caixa
router.post("/:id/fechar", (req, res) => {
    const id = req.params.id;

    const agora = new Date().toISOString();

    db.run(
        `
        UPDATE caixas
        SET 
            status = 'FECHADO',
            fechado_em = ?
        WHERE id = ?
        `,
        [agora, id],

        function (erro) {
            if (erro) {
                return res.status(500).json({
                    erro: erro.message,
                });
            }

            res.json({
                mensagem: "Caixa fechado com sucesso!",
                id,
            });
        }
    );
});
module.exports = router;

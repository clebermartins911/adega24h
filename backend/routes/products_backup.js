const express = require("express");
const router = express.Router();
const db = require("../database");
const validarProduto = require("../middleware/validarProduto");
console.log("products.js carregado");

// Listar todos os produtos
router.get("/", (req, res) => {
    db.all(
        `
    SELECT
        products.id,
        products.nome,
        products.preco,
        products.estoque,
        categories.nome AS categoria
    FROM products
    LEFT JOIN categories
        ON products.categoria_id = categories.id
`,
        [],
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    erro: err.message,
                });
            }

            res.json(rows);
        }
    );
});

// Buscar produto por ID
router.get("/:id", (req, res) => {
    const id = req.params.id;

    db.get(
        `
        SELECT
            products.id,
            products.nome,
            products.preco,
            products.estoque,
            categories.nome AS categoria
        FROM products
        LEFT JOIN categories
            ON products.categoria_id = categories.id
        WHERE products.id = ?
    `,
        [id],
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    erro: err.message,
                });
            }

            if (!row) {
                return res.status(404).json({
                    erro: "Produto não encontrado",
                });
            }

            res.json(row);
        }
    );
});

// Cadastrar produto
router.post("/", validarProduto, (req, res) => {
    console.log("ENTROU NO POST PRODUTO");
    console.log("BODY RECEBIDO:", req.body);

    const { nome, preco, estoque, categoria } = req.body;

    db.get("SELECT id FROM categories WHERE nome = ?", [categoria], (err, row) => {
        console.log("Categoria encontrada:", row);
        if (err) {
            return res.status(500).json({
                erro: err.message,
            });
        }

        if (!row) {
            return res.status(400).json({
                erro: "Categoria não encontrada",
            });
        }

        const categoria_id = row.id;

        console.log("ID DA CATEGORIA:", categoria_id);

        const sql = `
                INSERT INTO products (nome, preco, estoque, categoria_id)
                VALUES (?, ?, ?, ?)
            `;
        console.log("VAI INSERIR:", nome, preco, estoque, categoria_id);
        db.run(sql, [nome, preco, estoque, categoria_id], function (err) {
            if (err) {
                return res.status(500).json({
                    erro: err.message,
                });
            }

            res.status(201).json({
                mensagem: "Produto cadastrado com sucesso!",
                produto: {
                    id: this.lastID,
                    nome,
                    preco,
                    estoque,
                    categoria,
                },
            });
        });
    });
});

// Atualizar produto
router.put("/:id", validarProduto, (req, res) => {
    const id = req.params.id;
    const { nome, preco, estoque, categoria } = req.body;
    console.log("Categoria recebida:", categoria);
    console.log("Categoria recebida:", categoria);
    db.get("SELECT id FROM categories WHERE nome = ?", [categoria], (err, row) => {
        if (err) {
            return res.status(500).json({
                erro: err.message,
            });
        }

        if (!row) {
            return res.status(400).json({
                erro: "Categoria não encontrada",
            });
        }

        const categoria_id = row.id;
        console.log("Row:", row);
        console.log("Categoria ID:", categoria_id);
        console.log("Categoria encontrada:", row);
        console.log("Categoria ID:", categoria_id);
        const sql = `
                UPDATE products
                SET nome = ?, preco = ?, estoque = ?, categoria_id = ?
                WHERE id = ?
            `;
        console.log("Atualizando:", nome, preco, estoque, categoria_id, id);
        db.run(sql, [nome, preco, estoque, categoria_id, id], function (err) {
            if (err) {
                return res.status(500).json({
                    erro: err.message,
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    erro: "Produto não encontrado",
                });
            }

            res.json({
                mensagem: "Produto atualizado com sucesso!",
            });
        });
    });
});

// Excluir produto
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
        if (err) {
            return res.status(500).json({
                erro: err.message,
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                erro: "Produto não encontrado",
            });
        }

        res.json({
            mensagem: "Produto removido com sucesso!",
        });
    });
});

module.exports = router;

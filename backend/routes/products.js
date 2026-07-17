const express = require("express");
const router = express.Router();
const db = require("../database");
const validarProduto = require("../middleware/validarProduto");
console.log("products.js carregado");

// Listar todos os produtos
const productsController = require("../controllers/productsController");
router.get("/", productsController.listarProdutos);




// Buscar produto por ID
router.get("/:id", productsController.buscarPorId);

// Cadastrar produto
router.post("/", validarProduto, (req, res) => {

    
console.log("ENTROU NO POST PRODUTO");
console.log("BODY RECEBIDO:", req.body);

    const { nome, preco, estoque, categoria } = req.body;

    db.get(
        "SELECT id FROM categories WHERE nome = ?",
        [categoria],
        (err, row) => {
console.log("Categoria encontrada:", row);
            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            if (!row) {
                return res.status(400).json({
                    erro: "Categoria não encontrada"
                });
            }

            const categoria_id = row.id;

            console.log("ID DA CATEGORIA:", categoria_id);

            const sql = `
                INSERT INTO products (nome, preco, estoque, categoria_id)
                VALUES (?, ?, ?, ?)
            `;
console.log("VAI INSERIR:", nome, preco, estoque, categoria_id);
            db.run(
                sql,
                [nome, preco, estoque, categoria_id],
                function (err) {

                    if (err) {
                        return res.status(500).json({
                            erro: err.message
                        });
                    }

                    res.status(201).json({
                        mensagem: "Produto cadastrado com sucesso!",
                        produto: {
                            id: this.lastID,
                            nome,
                            preco,
                            estoque,
                            categoria
                        }
                    });

                }
            );

        }
    );

});

// Atualizar produto
router.put("/:id", validarProduto, productsController.atualizarProduto);

   

// Excluir produto
router.delete("/:id", productsController.excluirProduto);

module.exports = router;
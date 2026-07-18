const express = require("express");
const router = express.Router();
console.log("products.js carregado");
// Lista de produtos da adega
let products = [
    {
        id: 1,
        nome: "Heineken 600ml",
        preco: 12.9,
        estoque: 25,
    },
    {
        id: 2,
        nome: "Skol Lata 350ml",
        preco: 4.99,
        estoque: 80,
    },
    {
        id: 3,
        nome: "Red Bull",
        preco: 10.0,
        estoque: 30,
    },
];

// Retorna todos os produtos
router.get("/", (req, res) => {
    res.json(products);
});

// Retorna um produto pelo ID
router.get("/:id", (req, res) => {
    const produto = products.find((p) => p.id == req.params.id);

    if (!produto) {
        return res.status(404).json({
            erro: "Produto não encontrado",
        });
    }

    res.json(produto);
});

// Cadastra um novo produto
router.post("/", (req, res) => {
    const { nome, preco, estoque } = req.body;

    const novoProduto = {
        id: products.length + 1,
        nome,
        preco,
        estoque,
    };

    products.push(novoProduto);

    res.status(201).json({
        mensagem: "Produto cadastrado com sucesso!",
        produto: novoProduto,
    });
});
// Atualiza um produto
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const produto = products.find((p) => p.id === id);

    if (!produto) {
        return res.status(404).json({
            erro: "Produto não encontrado",
        });
    }

    const { nome, preco, estoque } = req.body;

    if (nome !== undefined) produto.nome = nome;
    if (preco !== undefined) produto.preco = preco;
    if (estoque !== undefined) produto.estoque = estoque;

    res.json({
        mensagem: "Produto atualizado com sucesso!",
        produto,
    });
});

// Exclui um produto
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            erro: "Produto não encontrado",
        });
    }

    const produtoRemovido = products.splice(index, 1);

    res.json({
        mensagem: "Produto removido com sucesso!",
        produto: produtoRemovido[0],
    });
});
module.exports = router;

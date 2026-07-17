const db = require("../database");


// Criar produto
function criarProduto(produto, callback) {

    const {
        nome,
        preco,
        estoque,
        categoria_id
    } = produto;


    db.run(
        `
        INSERT INTO products
        (nome, preco, estoque, categoria_id)
        VALUES (?, ?, ?, ?)
        `,
        [
            nome,
            preco,
            estoque,
            categoria_id
        ],
        function(err) {

            if (err) {
                return callback(err);
            }

            callback(null, {
                id: this.lastID
            });

        }
    );

}

// Listar produtos
function listarProdutos(callback) {

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
                return callback(err);
            }

            callback(null, rows);

        }
    );

}
// Buscar produto por ID
function buscarPorId(id, callback) {

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
                return callback(err);
            }

            callback(null, row);

        }
    );

    }
// Buscar categoria pelo nome
function buscarCategoriaId(nomeCategoria, callback) {

    db.get(
        "SELECT id FROM categories WHERE nome = ?",
        [nomeCategoria],
        (err, row) => {

            if (err) {
                return callback(err);
            }

            if (!row) {
                return callback(null, null);
            }

            callback(null, row.id);

        }
    );

      }
// Atualizar produto
function atualizarProduto(id, produto, callback) {

    const {
        nome,
        preco,
        estoque,
        categoria_id
    } = produto;


    db.run(
        `
        UPDATE products
        SET nome = ?, preco = ?, estoque = ?, categoria_id = ?
        WHERE id = ?
        `,
        [
            nome,
            preco,
            estoque,
            categoria_id,
            id
        ],
        function(err) {

            if (err) {
                return callback(err);
            }

            callback(null, {
                alterados: this.changes
            });

        }
    );

    }
// Excluir produto
function excluirProduto(id, callback) {

    db.run(
        "DELETE FROM products WHERE id = ?",
        [id],
        function(err) {

            if (err) {
                return callback(err);
            }

            callback(null, {
                removidos: this.changes
            });

        }
    );



}

module.exports = {
    criarProduto,
    listarProdutos,
    buscarPorId,
    buscarCategoriaId,
    atualizarProduto,
    excluirProduto
};
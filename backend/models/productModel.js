const db = require("../database");

// Criar produto
function criarProduto(produto, callback) {
    const { nome, obs, preco, custo, estoque, estoque_minimo, categoria_id } = produto;

    db.run(
        `
        INSERT INTO products
        (
            nome,
            obs,
            preco,
            custo,
            estoque,
            estoque_minimo,
            categoria_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [nome, obs, preco, custo, estoque, estoque_minimo, categoria_id],
        function (err) {
            if (err) {
                return callback(err);
            }

            callback(null, {
                id: this.lastID,
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
            products.obs,
            products.preco,
            products.custo,
            products.estoque,
            products.estoque_minimo,
            categories.nome AS categoria

        FROM products

        LEFT JOIN categories
        ON products.categoria_id = categories.id

        ORDER BY products.nome
        `,
        [],
        callback
    );
}

// Buscar por ID
function buscarPorId(id, callback) {
    db.get(
        `
        SELECT *
        FROM products
        WHERE id = ?
        `,
        [id],
        callback
    );
}

// Buscar categoria
function buscarCategoriaId(nome, callback) {
    db.get(
        `
        SELECT id
        FROM categories
        WHERE nome = ?
        `,
        [nome],
        (err, row) => {
            if (err) {
                return callback(err);
            }

            callback(null, row ? row.id : null);
        }
    );
}
// Buscar categoria por ID
function buscarCategoriaPorId(id, callback) {
    db.get(
        `
        SELECT *
        FROM categories
        WHERE id = ?
        `,
        [id],
        callback
    );
}
// Atualizar produto
function atualizarProduto(id, produto, callback) {
    const { nome, obs, preco, custo, estoque, estoque_minimo, categoria_id } = produto;

    db.run(
        `
        UPDATE products

        SET
        nome=?,
        obs=?,
        preco=?,
        custo=?,
        estoque=?,
        estoque_minimo=?,
        categoria_id=?

        WHERE id=?
        `,
        [nome, obs, preco, custo, estoque, estoque_minimo, categoria_id, id],

        function (err) {
            if (err) {
                return callback(err);
            }

            callback(null, {
                alterados: this.changes,
            });
        }
    );
}

// Excluir produto
function excluirProduto(id, callback) {
    db.run(
        `
        DELETE FROM products
        WHERE id=?
        `,
        [id],

        function (err) {
            if (err) {
                return callback(err);
            }

            callback(null, {
                removidos: this.changes,
            });
        }
    );
}
function buscarProdutoDuplicado(nome, obs, callback) {
    const sql = `
        SELECT *
        FROM products
        WHERE nome = ?
        AND obs = ?
    `;

    db.get(sql, [nome, obs], callback);
}
module.exports = {
    criarProduto,
    listarProdutos,
    buscarPorId,
    buscarCategoriaId,
    buscarCategoriaPorId,
    buscarProdutoDuplicado,
    atualizarProduto,
    excluirProduto,
};

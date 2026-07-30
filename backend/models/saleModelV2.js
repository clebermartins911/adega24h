const db = require("../database");

const saleModelV2 = {
    criarVenda(cliente_id, valor_total, forma_pagamento, callback) {
        const sql = `
            INSERT INTO sales_v2
            (cliente_id, valor_total, forma_pagamento)
            VALUES (?, ?, ?)
        `;

        db.run(sql, [cliente_id, valor_total, forma_pagamento], function (err) {
            if (err) return callback(err);

            callback(null, this.lastID);
        });
    },
    adicionarItem(sale_id, produto_id, nome_produto, quantidade, preco_unitario, callback) {
        const subtotal = quantidade * preco_unitario;

        const sql = `
        INSERT INTO sale_items
        (
            sale_id,
            produto_id,
            nome_produto,
            quantidade,
            preco_unitario,
            subtotal
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

        db.run(
            sql,
            [sale_id, produto_id, nome_produto, quantidade, preco_unitario, subtotal],
            callback
        );
    },
    listarItens(sale_id, callback) {
        db.all(
            `
            SELECT *
            FROM sale_items
            WHERE sale_id = ?
            ORDER BY id
            `,
            [sale_id],
            callback
        );
    },

    listarVendas(callback) {
        db.all(
            `
            SELECT *
            FROM sales_v2
            ORDER BY id DESC
            `,
            callback
        );
    },

    buscarVendaPorId(id, callback) {
        db.get(
            `
            SELECT *
            FROM sales_v2
            WHERE id = ?
            `,
            [id],
            callback
        );
    },
};

module.exports = saleModelV2;

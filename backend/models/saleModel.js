const db = require("../database");

// Criar uma venda
function criarVenda(venda, callback) {
    const { cliente_id, produto_id, quantidade, valor_total } = venda;

    console.log("TENTANDO SALVAR VENDA:", {
        cliente_id,
        produto_id,
        quantidade,
        valor_total,
    });

    db.run(
        `
        INSERT INTO sales
        (cliente_id, produto_id, quantidade, valor_total, data_venda)
        VALUES (?, ?, ?, ?, datetime('now'))
        `,
        [cliente_id || null, produto_id, quantidade, valor_total],
        function (err) {
            if (err) {
                console.log("========== ERRO AO SALVAR VENDA ==========");
                console.log("MENSAGEM SQLITE:", err.message);
                console.log("DADOS ENVIADOS:", {
                    cliente_id,
                    produto_id,
                    quantidade,
                    valor_total,
                });
                console.log("===========================================");

                return callback(err);
            }

            console.log("VENDA SALVA COM ID:", this.lastID);

            callback(null, {
                id: this.lastID,
            });
        }
    );
}

// Listar vendas

function listarVendas(callback) {
    db.all("SELECT * FROM sales", [], (err, rows) => {
        if (err) {
            return callback(err);
        }

        callback(null, rows);
    });
}

module.exports = {
    criarVenda,
    listarVendas,
};

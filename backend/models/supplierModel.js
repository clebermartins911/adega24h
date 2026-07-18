const db = require("../database");

// Criar fornecedor
function criarFornecedor(fornecedor, callback) {
    const { nome, telefone, email } = fornecedor;

    db.run(
        `
        INSERT INTO suppliers
        (nome, telefone, email)
        VALUES (?, ?, ?)
        `,
        [nome, telefone, email],
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

// Listar fornecedores
function listarFornecedores(callback) {
    db.all("SELECT * FROM suppliers", [], (err, rows) => {
        if (err) {
            return callback(err);
        }

        callback(null, rows);
    });
}

module.exports = {
    criarFornecedor,
    listarFornecedores,
};

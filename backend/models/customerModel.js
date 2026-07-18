const db = require("../database");

// Criar cliente
function criarCliente(cliente, callback) {
    const { nome, telefone, email } = cliente;

    db.run(
        `
        INSERT INTO customers
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

// Listar clientes
function listarClientes(callback) {
    db.all("SELECT * FROM customers", [], (err, rows) => {
        if (err) {
            return callback(err);
        }

        callback(null, rows);
    });
}

module.exports = {
    criarCliente,
    listarClientes,
};

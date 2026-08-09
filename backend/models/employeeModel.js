const db = require("../database");

const EmployeeModel = {
    listar(callback) {
        db.all("SELECT * FROM employees ORDER BY nome ASC", [], callback);
    },

    buscarPorId(id, callback) {
        db.get("SELECT * FROM employees WHERE id = ?", [id], callback);
    },

    buscarPorUsuario(usuario, callback) {
        db.get("SELECT * FROM employees WHERE usuario = ?", [usuario], callback);
    },

    cadastrar(funcionario, callback) {
        db.run(
            `INSERT INTO employees
            (nome, telefone, email, usuario, senha, cargo, permissao, ativo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                funcionario.nome,
                funcionario.telefone,
                funcionario.email,
                funcionario.usuario,
                funcionario.senha,
                funcionario.cargo,
                funcionario.permissao,
                funcionario.ativo ?? 1,
            ],
            callback
        );
    },

    atualizar(id, funcionario, callback) {
        db.run(
            `UPDATE employees
             SET nome = ?,
                 telefone = ?,
                 email = ?,
                 usuario = ?,
                 senha = ?,
                 cargo = ?,
                 permissao = ?,
                 ativo = ?
             WHERE id = ?`,
            [
                funcionario.nome,
                funcionario.telefone,
                funcionario.email,
                funcionario.usuario,
                funcionario.senha,
                funcionario.cargo,
                funcionario.permissao,
                funcionario.ativo,
                id,
            ],
            callback
        );
    },

    excluir(id, callback) {
        db.run("DELETE FROM employees WHERE id = ?", [id], callback);
    },
};

module.exports = EmployeeModel;

const Employee = require("../models/employeeModel");

const employeeController = {
    listar(req, res) {
        Employee.listar((erro, funcionarios) => {
            if (erro) {
                return res.status(500).json({
                    erro: erro.message,
                });
            }

            res.json(funcionarios);
        });
    },

    buscarPorId(req, res) {
        const { id } = req.params;

        Employee.buscarPorId(id, (erro, funcionario) => {
            if (erro) {
                return res.status(500).json({
                    erro: erro.message,
                });
            }

            if (!funcionario) {
                return res.status(404).json({
                    erro: "Funcionário não encontrado.",
                });
            }

            res.json(funcionario);
        });
    },

    cadastrar(req, res) {
        Employee.cadastrar(req.body, function (erro) {
            if (erro) {
                return res.status(500).json({
                    erro: erro.message,
                });
            }

            res.status(201).json({
                mensagem: "Funcionário cadastrado com sucesso!",
                id: this.lastID,
            });
        });
    },

    atualizar(req, res) {
        const { id } = req.params;

        Employee.atualizar(id, req.body, function (erro) {
            if (erro) {
                return res.status(500).json({
                    erro: erro.message,
                });
            }

            res.json({
                mensagem: "Funcionário atualizado com sucesso!",
            });
        });
    },

    excluir(req, res) {
        const { id } = req.params;

        Employee.excluir(id, function (erro) {
            if (erro) {
                return res.status(500).json({
                    erro: erro.message,
                });
            }

            res.json({
                mensagem: "Funcionário excluído com sucesso!",
            });
        });
    },
};

module.exports = employeeController;

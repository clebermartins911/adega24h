const Employee = require("../models/employeeModel");

function login(req, res) {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        return res.status(400).json({
            erro: "Usuário e senha são obrigatórios.",
        });
    }

    Employee.buscarPorUsuario(usuario, (erro, funcionario) => {
        if (erro) {
            return res.status(500).json({
                erro: erro.message,
            });
        }

        if (!funcionario) {
            return res.status(401).json({
                erro: "Usuário ou senha inválidos.",
            });
        }

        if (!funcionario.ativo) {
            return res.status(403).json({
                erro: "Funcionário inativo.",
            });
        }

        if (funcionario.senha !== senha) {
            return res.status(401).json({
                erro: "Usuário ou senha inválidos.",
            });
        }

        return res.json({
            sucesso: true,
            funcionario: {
                id: funcionario.id,
                nome: funcionario.nome,
                usuario: funcionario.usuario,
                cargo: funcionario.cargo,
                permissao: funcionario.permissao,
            },
        });
    });
}

module.exports = {
    login,
};

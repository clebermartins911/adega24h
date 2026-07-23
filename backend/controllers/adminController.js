const db = require("../database");


// Listar clientes do sistema
exports.listarClientes = (req, res) => {

    db.all(
        "SELECT * FROM clientes_sistema ORDER BY id DESC",
        [],
        (erro, clientes) => {

            if (erro) {
                return res.status(500).json({
                    erro: erro.message
                });
            }

            res.json(clientes);
        }
    );
};


// Criar cliente do sistema
exports.criarCliente = (req, res) => {

    const {
        empresa,
        responsavel,
        email,
        telefone,
        plano,
        vencimento
    } = req.body;


    db.run(
        `
        INSERT INTO clientes_sistema
        (
            empresa,
            responsavel,
            email,
            telefone,
            plano,
            vencimento
        )
        VALUES (?,?,?,?,?,?)
        `,
        [
            empresa,
            responsavel,
            email,
            telefone,
            plano || "START",
            vencimento
        ],

        function(erro){

            if(erro){
                return res.status(500).json({
                    erro: erro.message
                });
            }


            res.json({
                mensagem:"Cliente cadastrado com sucesso!",
                id:this.lastID
            });

        }
    );
};
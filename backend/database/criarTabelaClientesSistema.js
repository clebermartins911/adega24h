const db = require("../database");

db.run(`
CREATE TABLE IF NOT EXISTS clientes_sistema (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    empresa TEXT NOT NULL,

    responsavel TEXT,

    email TEXT,

    telefone TEXT,

    plano TEXT DEFAULT 'START',

    status TEXT DEFAULT 'ATIVO',

    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,

    vencimento TEXT

);
`,
(erro)=>{

    if(erro){
        console.log("Erro criando clientes_sistema:", erro.message);
    }else{
        console.log("Tabela clientes_sistema criada com sucesso!");
    }

});
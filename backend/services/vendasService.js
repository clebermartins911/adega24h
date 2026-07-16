const saleModel = require("../models/saleModel");


// Criar uma venda com regras do negócio
function criarVenda(dadosVenda, callback) {
const {
    cliente_id,
    produto_id,
    quantidade,
    valor_total
} = dadosVenda;

    // Validações iniciais
    if (!produto_id) {
        return callback({
            erro: "Produto obrigatório"
        });
    }


    if (!quantidade || quantidade <= 0) {
        return callback({
            erro: "Quantidade inválida"
        });
    }


  if (!valor_total || valor_total <= 0)
        return callback({
            erro: "Valor total inválido"
        });
    }


    // Envia para o model salvar no banco
    saleModel.criarVenda(
        {
            cliente_id,
            produto_id,
            quantidade,
           valor_total
        },
        callback
    );

}


// Buscar vendas
function listarVendas(callback) {

    saleModel.listarVendas(callback);

}


module.exports = {
    criarVenda,
    listarVendas
};
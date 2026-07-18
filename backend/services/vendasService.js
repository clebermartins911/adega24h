const saleModel = require("../models/saleModel");
const stockModel = require("../models/stockModel");


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


if (!valor_total || valor_total <= 0) {
    return callback({
        erro: "Valor total inválido"
    });
}

// Verificar estoque antes da venda
stockModel.buscarPorId(
    produto_id,
    (err, produto) => {

        if (err) {
            return callback(err);
        }


        if (!produto) {
            return callback({
                erro: "Produto não encontrado"
            });
        }


        if (produto.estoque < quantidade) {
            return callback({
                erro: "Estoque insuficiente"
            });
        }


        // Baixar estoque
        stockModel.saidaEstoque(
            produto_id,
            quantidade,
            (err, resultado) => {

                if (err) {
                    return callback(err);
                }


                if (resultado.alterados === 0) {
                    return callback({
                        erro: "Não foi possível atualizar estoque"
                    });
                }


                // Salvar venda
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
        );

    }
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
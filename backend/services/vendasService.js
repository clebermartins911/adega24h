const saleModel = require("../models/saleModel");
const stockModel = require("../models/stockModel");

// Criar uma venda com regras do negócio
function criarVenda(dadosVenda, callback) {
    const { cliente_id, produto_id, quantidade } = dadosVenda;

    // Validações iniciais

    if (!produto_id) {
        return callback({
            erro: "Produto obrigatório",
        });
    }

    if (!quantidade || quantidade <= 0) {
        return callback({
            erro: "Quantidade inválida",
        });
    }

    // Verificar estoque antes da venda

    stockModel.buscarPorId(produto_id, (err, produto) => {
        if (err) {
            return callback(err);
        }

        if (!produto) {
            return callback({
                erro: "Produto não encontrado",
            });
        }

        if (produto.estoque < quantidade) {
            return callback({
                erro: "Estoque insuficiente",
            });
        }

        const valor_total = produto.preco * quantidade;

        console.log("DADOS DA VENDA:", {
            cliente_id,
            produto_id,
            quantidade,
            preco: produto.preco,
            valor_total,
        });

        // Baixar estoque

        stockModel.saidaEstoque(produto_id, quantidade, (err, resultado) => {
            console.log("ENTROU NA BAIXA DE ESTOQUE");

            if (err) {
                console.log("ERRO ESTOQUE:", err);
                return callback(err);
            }

            if (resultado.alterados === 0) {
                return callback({
                    erro: "Não foi possível atualizar estoque",
                });
            }

            console.log("ESTOQUE ATUALIZADO COM SUCESSO");

            // Salvar venda

            saleModel.criarVenda(
                {
                    cliente_id,
                    produto_id,
                    quantidade,
                    valor_total,
                },
                callback
            );
        });
    });
}

// Buscar vendas

function listarVendas(callback) {
    saleModel.listarVendas(callback);
}

module.exports = {
    criarVenda,
    listarVendas,
};

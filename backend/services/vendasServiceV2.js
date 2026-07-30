const saleModelV2 = require("../models/saleModelV2");
const stockModel = require("../models/stockModel");

function criarVenda(dadosVenda, callback) {
    const { cliente_id = null, forma_pagamento, itens } = dadosVenda;

    // Validação do carrinho
    if (!Array.isArray(itens) || itens.length === 0) {
        return callback({
            erro: "Carrinho vazio.",
        });
    }

    // Validação da forma de pagamento
    if (!forma_pagamento) {
        return callback({
            erro: "Informe a forma de pagamento.",
        });
    }

    let valorTotal = 0;
    const produtosValidados = [];

    validarItens(itens, produtosValidados, 0, function (erro) {
        if (erro) {
            return callback(erro);
        }

        // Calcula o valor total
        produtosValidados.forEach((produto) => {
            valorTotal += produto.preco * produto.quantidade;
        });

        // Cria a venda
        saleModelV2.criarVenda(cliente_id, valorTotal, forma_pagamento, function (err, saleId) {
            if (err) {
                return callback(err);
            }

            salvarItens(saleId, produtosValidados, 0, function (erroSalvar) {
                if (erroSalvar) {
                    return callback(erroSalvar);
                }

                callback(null, {
                    sucesso: true,
                    sale_id: saleId,
                    valor_total: valorTotal,
                    itens: produtosValidados.length,
                    mensagem: "Venda realizada com sucesso.",
                });
            });
        });
    });
}

/*
|--------------------------------------------------------------------------
| Validação dos produtos
|--------------------------------------------------------------------------
*/

function validarItens(itens, produtosValidados, indice, callback) {
    if (indice >= itens.length) {
        return callback(null);
    }

    const item = itens[indice];

    stockModel.buscarPorId(item.produto_id, function (err, produto) {
        if (err) {
            return callback(err);
        }

        if (!produto) {
            return callback({
                erro: `Produto ${item.produto_id} não encontrado.`,
            });
        }

        if (produto.estoque < item.quantidade) {
            return callback({
                erro: `Estoque insuficiente para ${produto.nome}.`,
            });
        }

        produtosValidados.push({
            produto_id: produto.id,

            nome_produto: produto.nome,

            preco: produto.preco,

            quantidade: item.quantidade,
        });

        validarItens(itens, produtosValidados, indice + 1, callback);
    });
}
/*
|--------------------------------------------------------------------------
| Salva os itens e atualiza o estoque
|--------------------------------------------------------------------------
*/

function salvarItens(saleId, produtos, indice, callback) {
    if (indice >= produtos.length) {
        return callback(null);
    }

    const produto = produtos[indice];

    saleModelV2.adicionarItem(
        saleId,
        produto.produto_id,
        produto.nome_produto,
        produto.quantidade,
        produto.preco,
        function (err) {
            if (err) {
                return callback(err);
            }

            stockModel.saidaEstoque(
                produto.produto_id,
                produto.quantidade,
                function (erroEstoque, resultado) {
                    if (erroEstoque) {
                        return callback(erroEstoque);
                    }

                    if (!resultado || resultado.alterados === 0) {
                        return callback({
                            erro: `Não foi possível atualizar o estoque de ${produto.nome_produto}.`,
                        });
                    }

                    salvarItens(saleId, produtos, indice + 1, callback);
                }
            );
        }
    );
}

/*
|--------------------------------------------------------------------------
| Exportação
|--------------------------------------------------------------------------
*/

module.exports = {
    criarVenda,
};

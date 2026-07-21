const productModel = require("../models/productModel");

// ===============================
// Criar produto
// ===============================

function criarProduto(dadosProduto, callback) {
    const { nome, obs, preco, custo, estoque, estoque_minimo, categoria_id, codigo_barras } =
        dadosProduto;

    if (!nome) {
        return callback({
            erro: "Nome do produto é obrigatório",
        });
    }

    if (preco <= 0) {
        return callback({
            erro: "Preço inválido",
        });
    }

    if (estoque < 0) {
        return callback({
            erro: "Estoque inválido",
        });
    }

    if (!categoria_id) {
        return callback({
            erro: "Categoria é obrigatória",
        });
    }

    console.log("DEBUG categoria_id recebido:", categoria_id);

    productModel.buscarCategoriaPorId(categoria_id, (err, categoria) => {
        if (err) {
            return callback(err);
        }

        if (!categoria) {
            return callback({
                erro: "Categoria não encontrada",
            });
        }

        productModel.buscarProdutoDuplicado(nome, obs, (err, produtoExistente) => {
            if (err) {
                return callback(err);
            }

            if (produtoExistente) {
                return callback({
                    erro: "Produto já cadastrado",
                });
            }

            productModel.criarProduto(
                {
                    nome,
                    obs,
                    preco,
                    custo,
                    estoque,
                    estoque_minimo,
                    categoria_id,
                    codigo_barras,
                },
                callback
            );
        });
    });
}

// ===============================
// Listar produtos
// ===============================

function listarProdutos(callback) {
    productModel.listarProdutos(callback);
}

// ===============================
// Buscar produto por ID
// ===============================

function buscarPorId(id, callback) {
    productModel.buscarPorId(id, callback);
}

// ===============================
// Atualizar produto
// ===============================

function atualizarProduto(id, dadosProduto, callback) {
    const { nome, obs, preco, custo, estoque, estoque_minimo, categoria_id, codigo_barras } =
        dadosProduto;

    if (!nome) {
        return callback({
            erro: "Nome do produto é obrigatório",
        });
    }

    if (preco <= 0) {
        return callback({
            erro: "Preço inválido",
        });
    }

    if (estoque < 0) {
        return callback({
            erro: "Estoque inválido",
        });
    }

    productModel.atualizarProduto(
        id,
        {
            nome,
            obs,
            preco,
            custo,
            estoque,
            estoque_minimo,
            categoria_id,
            codigo_barras,
        },
        callback
    );
}

// ===============================
// Excluir produto
// ===============================

function excluirProduto(id, callback) {
    productModel.excluirProduto(id, callback);
}

// ===============================
// Exportação
// ===============================

module.exports = {
    criarProduto,

    listarProdutos,

    buscarPorId,

    atualizarProduto,

    excluirProduto,
};

const productModel = require("../models/productModel");

// Criar produto
function criarProduto(dadosProduto, callback) {
    const { nome, obs, preco, custo, estoque, estoque_minimo, categoria_id } = dadosProduto;

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

    // Confirma se categoria existe pelo ID
    productModel.buscarCategoriaPorId(categoria_id, (err, categoria) => {
        if (err) {
            return callback(err);
        }

        if (!categoria) {
            return callback({
                erro: "Categoria não encontrada",
            });
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
                },
                callback
            );
        });
    });
}

// Listar produtos
function listarProdutos(callback) {
    productModel.listarProdutos(callback);
}

// Atualizar produto
function atualizarProduto(id, dadosProduto, callback) {
    const { nome, obs, preco, custo, estoque, estoque_minimo, categoria, categoria_id } =
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

    // aceita categoria_id direto ou busca pelo nome da categoria

    if (categoria_id) {
        return productModel.atualizarProduto(
            id,
            {
                nome,
                obs,
                preco,
                custo,
                estoque,
                estoque_minimo,
                categoria_id,
            },
            callback
        );
    }

    productModel.buscarCategoriaId(categoria, (err, categoria_idEncontrada) => {
        if (err) {
            return callback(err);
        }

        if (!categoria_idEncontrada) {
            return callback({
                erro: "Categoria não encontrada",
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
                categoria_id: categoria_idEncontrada,
            },
            callback
        );
    });
}

// Buscar produto por ID
function buscarPorId(id, callback) {
    productModel.buscarPorId(id, callback);
}

// Excluir produto
function excluirProduto(id, callback) {
    productModel.excluirProduto(id, callback);
}
module.exports = {
    criarProduto,
    listarProdutos,
    buscarPorId,

    atualizarProduto,
    excluirProduto,
};

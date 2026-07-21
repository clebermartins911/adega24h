let itens = [];

/*
    Adiciona item no carrinho
*/
function adicionarItem(produto) {
    const itemExistente = itens.find((item) => item.produto_id === produto.produto_id);

    if (itemExistente) {
        itemExistente.quantidade += produto.quantidade;

        itemExistente.subtotal = itemExistente.preco * itemExistente.quantidade;

        return itemExistente;
    }

    const novoItem = {
        produto_id: produto.produto_id,

        nome: produto.nome,

        preco: produto.preco,

        quantidade: produto.quantidade,

        subtotal: produto.preco * produto.quantidade,
    };

    itens.push(novoItem);

    return novoItem;
}

/*
    Lista itens do carrinho
*/
function listarItens() {
    return itens;
}

/*
    Remove item
*/
function removerItem(produto_id) {
    itens = itens.filter((item) => item.produto_id !== produto_id);
}

/*
    Limpa carrinho
*/
function limparCarrinho() {
    itens = [];
}

/*
    Calcula total
*/
function calcularTotal() {
    return itens.reduce((total, item) => total + item.subtotal, 0);
}

module.exports = {
    adicionarItem,

    listarItens,

    removerItem,

    limparCarrinho,

    calcularTotal,
};

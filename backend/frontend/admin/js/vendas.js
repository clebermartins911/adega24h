let carrinho = [];

async function carregarProdutosVenda() {
    const resposta = await fetch("/products");
    return await resposta.json();
}

async function adicionarProduto() {
    const pesquisa = document.getElementById("buscarProduto").value.toLowerCase();

    const produtos = await carregarProdutosVenda();

    const produto = produtos.find(
        (p) => p.nome.toLowerCase().includes(pesquisa) || String(p.id) === pesquisa
    );

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const existente = carrinho.find((p) => p.id === produto.id);

    if (existente) {
        existente.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1,
        });
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {
    const tabela = document.getElementById("listaVenda");

    tabela.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto, index) => {
        const subtotal = produto.preco * produto.quantidade;

        total += subtotal;

        tabela.innerHTML += `
            <tr>
                <td>${produto.nome}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>R$ ${subtotal.toFixed(2)}</td>
                <td>
                    <button onclick="removerProduto(${index})">❌</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalVenda").innerText = `R$ ${total.toFixed(2)}`;
}

function removerProduto(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}
async function finalizarVenda() {
    if (carrinho.length === 0) {
        alert("Adicione pelo menos um produto.");
        return;
    }

    const formaPagamento = document.getElementById("formaPagamento").value;

    try {
        for (const item of carrinho) {
            const resposta = await fetch("/sales", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cliente_id: null,
                    produto_id: item.id,
                    quantidade: item.quantidade,
                    forma_pagamento: formaPagamento,
                }),
            });

            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(resultado.erro || "Erro ao finalizar venda.");
            }
        }

        alert("Venda realizada com sucesso!");

        carrinho = [];
        atualizarCarrinho();
    } catch (erro) {
        alert(erro.message);
        console.error(erro);
    }
}
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        finalizarVenda();
    }
});

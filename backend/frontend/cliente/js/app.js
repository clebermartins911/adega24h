console.log("Cliente Adega24hSystem carregado");

const API = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos();
});

async function carregarProdutos() {
    try {
        const resposta = await fetch(`${API}/products`);

        const produtos = await resposta.json();

        mostrarProdutos(produtos);
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
    }
}

function mostrarProdutos(produtos) {
    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach((produto) => {
        const card = document.createElement("div");

        card.className = "produto-card";

        card.innerHTML = `
            <h3>${produto.nome}</h3>

            <p>${produto.obs || ""}</p>

            <p>Categoria: ${produto.categoria}</p>

            <strong>
                R$ ${produto.preco.toFixed(2)}
            </strong>

            <br>

            <button onclick="adicionarProduto(${produto.id})">
                Adicionar
            </button>
        `;

        lista.appendChild(card);
    });
}

function adicionarProduto(id) {
    console.log("Produto selecionado:", id);

    alert("Produto " + id + " será enviado para o módulo Carrinho.");
}

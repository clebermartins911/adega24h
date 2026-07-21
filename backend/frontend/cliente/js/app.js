console.log("Cliente Adega24hSystem carregado");

const API = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos();

    const campoBusca = document.getElementById("buscarProduto");

    if (campoBusca) {
        campoBusca.addEventListener("input", () => {
            filtrarProdutos(campoBusca.value);
        });
    }
});

let listaCompletaProdutos = [];

/*
    Busca produtos da API
*/
async function carregarProdutos() {
    try {
        const resposta = await fetch(`${API}/products`);

        const produtos = await resposta.json();

        listaCompletaProdutos = produtos;

        mostrarProdutos(produtos);
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
    }
}

/*
    Mostra produtos na tela
*/
function mostrarProdutos(produtos) {
    const lista = document.getElementById("listaProdutos");

    if (!lista) {
        console.error("Elemento listaProdutos não encontrado");
        return;
    }

    lista.innerHTML = "";

    produtos.forEach((produto) => {
        const card = document.createElement("div");

        card.className = "produto-card";

        card.innerHTML = `

            <h3>
                ${produto.nome}
            </h3>


            <p>
                ${produto.obs || ""}
            </p>


            <p>
                Categoria: ${produto.categoria || ""}
            </p>


            <strong>
                R$ ${produto.preco.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                })}
            </strong>


            <br>


            <button onclick="adicionarProduto(${produto.id})">
                Adicionar
            </button>

        `;

        lista.appendChild(card);
    });
}

/*
    Busca de produtos
*/
function filtrarProdutos(texto) {
    const busca = texto.toLowerCase();

    const produtosFiltrados = listaCompletaProdutos.filter((produto) => {
        return produto.nome.toLowerCase().includes(busca);
    });

    mostrarProdutos(produtosFiltrados);
}

/*
    Adicionar produto ao carrinho
*/
async function adicionarProduto(id) {
    const produto = listaCompletaProdutos.find((item) => item.id === id);

    if (!produto) {
        console.error("Produto não encontrado");
        return;
    }

    try {
        const resposta = await fetch(`${API}/cart/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                produto_id: produto.id,
                nome: produto.nome,
                preco: produto.preco,
                quantidade: 1,
            }),
        });

        const dados = await resposta.json();

        console.log("Produto enviado para carrinho:", dados);

        alert(`${produto.nome} adicionado ao carrinho`);
    } catch (erro) {
        console.error("Erro ao adicionar produto:", erro);
    }
}

// ======================================
// Adega24hSystem - PDV
// ======================================

// Elementos da tela
const codigo = document.getElementById("codigo");

const nomeProduto = document.getElementById("nomeProduto");
const codigoProduto = document.getElementById("codigoProduto");
const precoProduto = document.getElementById("precoProduto");

const listaItens = document.getElementById("listaItens");

const totalVenda = document.getElementById("totalVenda");
const quantidadeItens = document.getElementById("quantidadeItens");
const resumoVenda = document.getElementById("resumoVenda");
let produtos = [];
async function carregarProdutos() {
    try {
        const resposta = await fetch("/products");

        produtos = await resposta.json();

        console.log(produtos);

        console.log(`${produtos.length} produtos carregados.`);
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
    }
}
// Carrinho
let carrinho = [];
let valorTotal = 0;

// Foco no leitor
codigo.focus();

// Enter
codigo.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;

    e.preventDefault();

    adicionarProduto(codigo.value.trim());

    codigo.value = "";

    codigo.focus();
});

// Adiciona produto
function adicionarProduto(cod) {
    if (cod === "") return;

    const dados = produtos.find((produto) => produto.codigo_barras === cod);

    if (!dados) {
        alert("Produto não encontrado!");
        return;
    }

    let produto = carrinho.find((p) => p.codigo === cod);

    if (produto) {
        produto.quantidade++;
    } else {
        produto = {
            codigo: cod,
            nome: dados.nome,
            preco: dados.preco,
            quantidade: 1,
        };

        carrinho.push(produto);
    }

    nomeProduto.textContent = produto.nome;
    codigoProduto.textContent = produto.codigo;
    precoProduto.textContent = "R$ " + produto.preco.toFixed(2);

    atualizarTabela();
}
// Atualiza resumo da venda
function atualizarResumoVenda() {
    resumoVenda.innerHTML = "";

    if (carrinho.length === 0) {
        resumoVenda.innerHTML = "Nenhum item.";
        return;
    }

    carrinho.forEach((item) => {
        const linha = document.createElement("div");

        linha.className = "resumo-linha";

        linha.innerHTML = `
            <span>${item.quantidade}x ${item.nome}</span>
            <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
        `;

        resumoVenda.appendChild(linha);
    });
}
// Atualiza tabela
function atualizarTabela() {
    listaItens.innerHTML = "";

    valorTotal = 0;

    carrinho.forEach((item, indice) => {
        const totalItem = item.preco * item.quantidade;

        valorTotal += totalItem;

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${indice + 1}</td>
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>R$ ${totalItem.toFixed(2)}</td>
        `;

        listaItens.appendChild(tr);
    });

    totalVenda.textContent = "R$ " + valorTotal.toFixed(2);
    quantidadeItens.textContent = carrinho.length;
    atualizarResumoVenda();
}
carregarProdutos();

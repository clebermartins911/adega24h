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

// Produtos de teste
const produtosTeste = {
    789001: { nome: "Heineken Long Neck", preco: 12.0 },
    789002: { nome: "Corona Extra", preco: 18.0 },
    789003: { nome: "Skol Lata", preco: 5.5 },
    789004: { nome: "Brahma Duplo Malte", preco: 6.5 },
    789005: { nome: "Budweiser", preco: 8.0 },
    789006: { nome: "Stella Artois", preco: 10.5 },
    789007: { nome: "Antarctica Original", preco: 11.0 },
    789008: { nome: "Amstel", preco: 7.5 },
    789009: { nome: "Red Bull", preco: 13.0 },
    789010: { nome: "Coca-Cola 2L", preco: 11.9 },
    789011: { nome: "Pepsi 2L", preco: 10.9 },
    789012: { nome: "Guaraná Antarctica 2L", preco: 9.9 },
    789013: { nome: "Água Mineral", preco: 3.5 },
    789014: { nome: "Whisky Red Label", preco: 89.9 },
    789015: { nome: "Vodka Smirnoff", preco: 42.9 },
};

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
    console.log("Código recebido:", "[" + cod + "]");
    if (cod === "") return;

    const dados = produtosTeste[cod];

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

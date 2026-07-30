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
let formaPagamento = "PIX";
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
function adicionarProduto(dados) {
    if (!dados) return;

    if (typeof dados !== "object") {
        dados = produtos.find((produto) => produto.codigo_barras === dados);

        if (!dados) {
            alert("Produto não encontrado!");
            return;
        }
    }

    let produto = carrinho.find((p) => p.produto_id === dados.id);

    if (produto) {
        produto.quantidade++;
    } else {
        produto = {
            produto_id: dados.id,
            codigo: dados.codigo_barras,
            nome: dados.nome,
            preco: Number(dados.preco),
            quantidade: 1,
        };

        carrinho.push(produto);
    }

    nomeProduto.textContent = produto.nome;
    codigoProduto.textContent = produto.codigo ?? "-";
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
function carregarProdutosModal(lista = produtos) {
    const tabela = document.getElementById("listaProdutosModal");

    tabela.innerHTML = "";

    lista.forEach((produto) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${produto.codigo_barras ?? "-"}</td>
            <td>${produto.nome}</td>
            <td>R$ ${Number(produto.preco).toFixed(2)}</td>
            <td>${produto.estoque}</td>
        `;

        tr.addEventListener("dblclick", () => {
            adicionarProduto(produto);

            modalProdutos.style.display = "none";

            codigo.focus();
        });

        tabela.appendChild(tr);
    });
}
function cancelarVenda() {
    carrinho = [];
    valorTotal = 0;

    atualizarTabela();

    nomeProduto.textContent = "-";
    codigoProduto.textContent = "-";
    precoProduto.textContent = "R$ 0,00";

    codigo.value = "";
    codigo.focus();
}
// Finaliza a venda
async function finalizarVenda() {
    if (carrinho.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    const venda = {
        cliente_id: null,
        forma_pagamento: formaPagamento,
        itens: carrinho.map((item) => ({
            produto_id: item.produto_id,
            quantidade: item.quantidade,
        })),
    };

    try {
        const resposta = await fetch("/salesV2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(venda),
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(resultado.erro || "Erro ao finalizar venda.");
            return;
        }

        alert("Venda realizada com sucesso!");

        carrinho = [];
        valorTotal = 0;

        atualizarTabela();

        nomeProduto.textContent = "-";
        codigoProduto.textContent = "-";
        precoProduto.textContent = "R$ 0,00";

        codigo.value = "";
        codigo.focus();
    } catch (erro) {
        console.error(erro);
        alert("Erro ao conectar ao servidor.");
    }
}
carregarProdutos();

const btnPix = document.getElementById("btnPix");
const btnDinheiro = document.getElementById("btnDinheiro");
const btnCartao = document.getElementById("btnCartao");
const btnCancelar = document.getElementById("btnCancelar");
const btnFinalizar = document.getElementById("btnFinalizar");

const btnProduto = document.getElementById("btnProduto");

const modalProdutos = document.getElementById("modalProdutos");
const fecharModal = document.getElementById("fecharModal");

btnProduto.addEventListener("click", () => {
    carregarProdutosModal();
    modalProdutos.style.display = "flex";
});

fecharModal.addEventListener("click", () => {
    modalProdutos.style.display = "none";
    codigo.focus();
});
btnPix.addEventListener("click", () => {
    formaPagamento = "PIX";
    alert("Pagamento: PIX");
});

btnDinheiro.addEventListener("click", () => {
    formaPagamento = "DINHEIRO";
    alert("Pagamento: Dinheiro");
});

btnCartao.addEventListener("click", () => {
    formaPagamento = "CARTAO";
    alert("Pagamento: Cartão");
});

btnCancelar.addEventListener("click", cancelarVenda);

btnFinalizar.addEventListener("click", finalizarVenda);

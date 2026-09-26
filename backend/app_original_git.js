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
let caixaAtual = null;
let funcionarioAtual = null;
let desconto = 0;
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

    const totalComDesconto = Math.max(0, valorTotal - desconto);

    totalVenda.textContent = "R$ " + totalComDesconto.toFixed(2);
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
        console.log("Produtos carregados:", tabela.rows.length);
        console.log("Altura da tabela:", tabela.scrollHeight);
        console.log("Altura visível:", tabela.clientHeight);
    });
}
function aplicarDesconto() {
    const valor = prompt("Informe o desconto em R$");

    if (valor === null) return;

    const descontoInformado = Number(valor.replace(",", "."));

    if (isNaN(descontoInformado) || descontoInformado < 0) {
        alert("Valor de desconto inválido.");
        return;
    }

    desconto = descontoInformado;

    atualizarTabela();

    alert("Desconto aplicado com sucesso!");
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
    if (!caixaAtual) {
        alert("Abra o caixa antes de realizar uma venda.");
        return;
    }
    const venda = {
        cliente_id: null,
        caixa_id: caixaAtual,
        funcionario_id: funcionarioAtual,
        desconto: desconto,
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
        await carregarProdutos();

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
async function abrirCaixa() {
    try {
        const resposta = await fetch("/caixas/1/abrir", {
            method: "POST",
        });

        const resultado = await resposta.json();

        alert(resultado.mensagem);

        caixaAtual = 1;

        if (statusCaixa) {
            statusCaixa.textContent = "Caixa: Aberto";
        }
    } catch (erro) {
        console.error(erro);
        alert("Erro ao abrir caixa.");
    }
}

async function fecharCaixa() {
    try {
        const resposta = await fetch("/caixas/1/fechar", {
            method: "POST",
        });

        const resultado = await resposta.json();

        alert(resultado.mensagem);

        caixaAtual = null;

        if (statusCaixa) {
            statusCaixa.textContent = "Caixa: Fechado";
        }
    } catch (erro) {
        console.error(erro);
        alert("Erro ao fechar caixa.");
    }
}
carregarProdutos();

const btnPix = document.getElementById("btnPix");
const btnDinheiro = document.getElementById("btnDinheiro");
const btnCartao = document.getElementById("btnCartao");
const btnCancelar = document.getElementById("btnCancelar");
const btnFinalizar = document.getElementById("btnFinalizar");
const btnDesconto = document.getElementById("btnDesconto");

const btnProduto = document.getElementById("btnProduto");
const btnBuscar = document.getElementById("btnBuscar");
const pesquisaProduto = document.getElementById("pesquisaProduto");

const modalProdutos = document.getElementById("modalProdutos");
const fecharModal = document.getElementById("fecharModal");
const btnAbrirCaixa = document.getElementById("btnAbrirCaixa");
const btnFecharCaixa = document.getElementById("btnFecharCaixa");

const statusCaixa = document.getElementById("statusCaixa");
btnProduto.addEventListener("click", () => {
    carregarProdutosModalV2();

    modalProdutosV2.classList.add("ativo");

    pesquisaProdutoV2.value = "";
    pesquisaProdutoV2.focus();
});

btnBuscar.addEventListener("click", () => {
    carregarProdutosModalV2();

    modalProdutosV2.classList.add("ativo");

    pesquisaProdutoV2.value = "";
    pesquisaProdutoV2.focus();
});
pesquisaProduto.addEventListener("input", () => {
    const texto = pesquisaProduto.value.toLowerCase();

    const filtrados = produtos.filter((produto) => {
        return (
            produto.nome.toLowerCase().includes(texto) ||
            (produto.codigo_barras || "").includes(texto) ||
            (produto.categoria || "").toLowerCase().includes(texto)
        );
    });

    carregarProdutosModal(filtrados);
});
modalProdutos.addEventListener("click", (e) => {
    if (e.target === modalProdutos) {
        modalProdutos.style.display = "none";
        codigo.focus();
    }
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
btnDesconto.addEventListener("click", aplicarDesconto);

if (btnAbrirCaixa) {
    btnAbrirCaixa.addEventListener("click", abrirCaixa);
}

if (btnFecharCaixa) {
    btnFecharCaixa.addEventListener("click", fecharCaixa);
}
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modalProdutos.style.display = "none";
        codigo.focus();
    }
});
modalProdutos.addEventListener("click", (e) => {
    if (e.target === modalProdutos) {
        modalProdutos.style.display = "none";
        codigo.focus();
    }
});
// ===============================
// MODAL PRODUTOS V2
// ===============================

const modalProdutosV2 = document.getElementById("modalProdutosV2");
const listaProdutosV2 = document.getElementById("listaProdutosV2");
const pesquisaProdutoV2 = document.getElementById("pesquisaProdutoV2");
const fecharModalV2 = document.getElementById("fecharModalV2");

function carregarProdutosModalV2(lista = produtos) {
    listaProdutosV2.innerHTML = "";

    lista.forEach((produto) => {
        const linha = document.createElement("div");

        linha.className = "linha-produto";

        linha.innerHTML = `
            <span>${produto.codigo_barras ?? "-"}</span>
            <span>${produto.nome}</span>
            <span>R$ ${Number(produto.preco).toFixed(2)}</span>
            <span>${produto.estoque}</span>
        `;

        linha.addEventListener("dblclick", () => {
            adicionarProduto(produto);

            modalProdutosV2.classList.remove("ativo");

            codigo.focus();
        });

        listaProdutosV2.appendChild(linha);
    });
}
// Fechar no botão X
fecharModalV2.addEventListener("click", () => {
    modalProdutosV2.classList.remove("ativo");
    codigo.focus();
});

// Fechar clicando fora
modalProdutosV2.addEventListener("click", (e) => {
    if (e.target === modalProdutosV2) {
        modalProdutosV2.classList.remove("ativo");
        codigo.focus();
    }
});

// Fechar com ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalProdutosV2.classList.contains("ativo")) {
        modalProdutosV2.classList.remove("ativo");
        codigo.focus();
    }
});

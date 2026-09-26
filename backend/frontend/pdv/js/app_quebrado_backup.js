// ============================================================
// ADEGA24HSYSTEM - PDV
// app.js
// ============================================================

"use strict";

// ============================================================
// ESTADO DO PDV
// ============================================================

let carrinho = [];
let produtos = [];
let funcionarioAtual = null;
let caixaAtual = null;
let formaPagamentoAtual = null;
let descontoAtual = 0;
let vendaEmProcessamento = false;

// ============================================================
// INICIALIZAÇÃO
// ============================================================

document.addEventListener("DOMContentLoaded", async () => {
    console.log("=================================");
    console.log("PDV iniciado");
    console.log("=================================");

    try {
        await carregarProdutos();
        await carregarFuncionarios();
        await carregarCaixaAtual();

        configurarEventos();
        atualizarCarrinho();
        atualizarFuncionarioNaTela();
        atualizarCaixaNaTela();

        console.log("PDV carregado com sucesso.");
    } catch (erro) {
        console.error("Erro ao iniciar PDV:", erro);
    }
});

// ============================================================
// EVENTOS
// ============================================================

function configurarEventos() {
    // FUNCIONÁRIO
    const btnFuncionario = document.getElementById("btnFuncionario");

    if (btnFuncionario) {
        btnFuncionario.addEventListener("click", abrirModalFuncionario);
    }

    // CANCELAR VENDA
    const btnCancelarVenda = document.getElementById("btnCancelarVenda");

    if (btnCancelarVenda) {
        btnCancelarVenda.addEventListener("click", cancelarVenda);
    }

    // FINALIZAR VENDA
    const btnFinalizarVenda = document.getElementById("btnFinalizarVenda");

    if (btnFinalizarVenda) {
        btnFinalizarVenda.addEventListener("click", finalizarVenda);
    }

    // DINHEIRO
    const btnDinheiro = document.getElementById("btnDinheiro");

    if (btnDinheiro) {
        btnDinheiro.addEventListener("click", () => {
            formaPagamentoAtual = "DINHEIRO";
            abrirModalTroco();
        });
    }

    // PIX
    const btnPix = document.getElementById("btnPix");

    if (btnPix) {
        btnPix.addEventListener("click", () => {
            formaPagamentoAtual = "PIX";
            finalizarVenda();
        });
    }

    // CARTÃO
    const btnCartao = document.getElementById("btnCartao");

    if (btnCartao) {
        btnCartao.addEventListener("click", () => {
            formaPagamentoAtual = "CARTAO";
            finalizarVenda();
        });
    }
}

// ============================================================
// FUNCIONÁRIOS
// ============================================================

async function carregarFuncionarios() {
    try {
        const resposta = await fetch("/employees");

        if (!resposta.ok) {
            throw new Error(`Erro ao buscar funcionários: HTTP ${resposta.status}`);
        }

        const dados = await resposta.json();

        funcionarios = Array.isArray(dados) ? dados : dados.funcionarios || dados.data || [];

        console.log("Funcionários carregados:", funcionarios);
    } catch (erro) {
        console.error("Erro ao carregar funcionários:", erro);
    }
}

// variável global para lista de funcionários
let funcionarios = [];

// ============================================================
// ABRIR MODAL DE FUNCIONÁRIO
// ============================================================

function abrirModalFuncionario() {
    const modal = document.getElementById("modalFuncionario");

    if (!modal) {
        console.error("Modal de funcionário não encontrado: #modalFuncionario");
        return;
    }

    const lista = document.getElementById("listaFuncionarios");

    if (!lista) {
        console.error("Lista de funcionários não encontrada: #listaFuncionarios");
        return;
    }

    lista.innerHTML = "";

    if (!funcionarios.length) {
        lista.innerHTML = `
            <div class="mensagem-vazia">
                Nenhum funcionário encontrado.
            </div>
        `;

        modal.style.display = "flex";
        return;
    }

    funcionarios.forEach((funcionario) => {
        const id = funcionario.id ?? funcionario.funcionario_id;

        const nome =
            funcionario.nome ||
            funcionario.name ||
            funcionario.nome_completo ||
            `Funcionário ${id}`;

        const item = document.createElement("button");

        item.type = "button";
        item.className = "funcionario-item";

        item.dataset.id = id;

        item.innerHTML = `
            <strong>${escaparHTML(nome)}</strong>
            <span>ID: ${escaparHTML(String(id))}</span>
        `;

        item.addEventListener("click", () => {
            selecionarFuncionario(funcionario);
        });

        lista.appendChild(item);
    });

    modal.style.display = "flex";
}

// ============================================================
// SELECIONAR FUNCIONÁRIO
// ============================================================

function selecionarFuncionario(funcionario) {
    if (!funcionario) {
        console.error("Funcionário inválido.");
        return;
    }

    const id = funcionario.id ?? funcionario.funcionario_id;

    const nome =
        funcionario.nome || funcionario.name || funcionario.nome_completo || `Funcionário ${id}`;

    funcionarioAtual = {
        id: id,
        nome: nome,
    };

    console.log("Funcionário selecionado:", funcionarioAtual);

    localStorage.setItem("funcionarioPDV", JSON.stringify(funcionarioAtual));

    atualizarFuncionarioNaTela();

    fecharModalFuncionario();
}

// ============================================================
// FUNCIONÁRIO SALVO
// ============================================================

function recuperarFuncionarioSalvo() {
    try {
        const salvo = localStorage.getItem("funcionarioPDV");

        if (!salvo) {
            return;
        }

        const funcionario = JSON.parse(salvo);

        if (funcionario && funcionario.id) {
            funcionarioAtual = funcionario;

            console.log("Funcionário recuperado:", funcionarioAtual);

            atualizarFuncionarioNaTela();
        }
    } catch (erro) {
        console.error("Erro ao recuperar funcionário:", erro);
    }
}

// ============================================================
// ATUALIZAR FUNCIONÁRIO NA TELA
// ============================================================

function atualizarFuncionarioNaTela() {
    const elemento =
        document.getElementById("funcionarioAtual") || document.getElementById("nomeFuncionario");

    if (!elemento) {
        return;
    }

    if (!funcionarioAtual) {
        elemento.textContent = "Nenhum funcionário selecionado";

        return;
    }

    elemento.textContent = `${funcionarioAtual.nome} (#${funcionarioAtual.id})`;
}

// ============================================================
// FECHAR MODAL FUNCIONÁRIO
// ============================================================

function fecharModalFuncionario() {
    const modal = document.getElementById("modalFuncionario");

    if (modal) {
        modal.style.display = "none";
    }
}

// ============================================================
// PRODUTOS
// ============================================================

async function carregarProdutos() {
    try {
        const resposta = await fetch("/products");

        if (!resposta.ok) {
            throw new Error(`Erro ao buscar produtos: HTTP ${resposta.status}`);
        }

        const dados = await resposta.json();

        produtos = Array.isArray(dados)
            ? dados
            : dados.produtos || dados.products || dados.data || [];

        console.log("Produtos carregados:", produtos.length);
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
    }
}

// ============================================================
// ADICIONAR PRODUTO AO CARRINHO
// ============================================================

function adicionarProduto(produto) {
    if (!produto) {
        return;
    }

    const produtoId = produto.id ?? produto.produto_id;

    const estoque = Number(produto.estoque ?? produto.quantidade_estoque ?? produto.stock ?? 0);

    if (estoque <= 0) {
        alert("Produto sem estoque.");

        return;
    }

    const existente = carrinho.find((item) => item.produto_id === produtoId);

    if (existente) {
        if (existente.quantidade >= estoque) {
            alert("Quantidade maior que o estoque disponível.");

            return;
        }

        existente.quantidade++;
    } else {
        carrinho.push({
            produto_id: produtoId,

            nome: produto.nome || produto.name || "Produto",

            preco: Number(produto.preco ?? produto.valor ?? produto.price ?? 0),

            quantidade: 1,

            estoque: estoque,
        });
    }

    atualizarCarrinho();
}

// ============================================================
// REMOVER PRODUTO
// ============================================================

function removerProduto(produtoId) {
    carrinho = carrinho.filter((item) => item.produto_id !== produtoId);

    atualizarCarrinho();
}

// ============================================================
// ALTERAR QUANTIDADE
// ============================================================

function alterarQuantidade(produtoId, quantidade) {
    const item = carrinho.find((produto) => produto.produto_id === produtoId);

    if (!item) {
        return;
    }

    quantidade = Number(quantidade);

    if (quantidade <= 0) {
        removerProduto(produtoId);

        return;
    }

    if (item.estoque && quantidade > item.estoque) {
        alert("Quantidade maior que o estoque disponível.");

        return;
    }

    item.quantidade = quantidade;

    atualizarCarrinho();
}

// ============================================================
// TOTAL DO CARRINHO
// ============================================================

function calcularSubtotal() {
    return carrinho.reduce((total, item) => {
        return total + Number(item.preco) * Number(item.quantidade);
    }, 0);
}

// ============================================================
// DESCONTO
// ============================================================

function calcularTotalVenda() {
    const subtotal = calcularSubtotal();

    const desconto = Number(descontoAtual) || 0;

    const total = subtotal - desconto;

    return Math.max(total, 0);
}

// ============================================================
// ATUALIZAR CARRINHO
// ============================================================

function atualizarCarrinho() {
    const lista = document.getElementById("listaCarrinho") || document.getElementById("carrinho");

    if (lista) {
        lista.innerHTML = "";

        carrinho.forEach((item) => {
            const linha = document.createElement("div");

            linha.className = "item-carrinho";

            linha.innerHTML = `

                <div class="produto-carrinho">

                    <strong>
                        ${escaparHTML(item.nome)}
                    </strong>

                    <span>
                        R$ ${formatarMoeda(item.preco)}
                    </span>

                </div>

                <div class="quantidade-carrinho">

                    <button
                        type="button"
                        onclick="alterarQuantidade(${item.produto_id}, ${item.quantidade - 1})"
                    >
                        -
                    </button>

                    <span>
                        ${item.quantidade}
                    </span>

                    <button
                        type="button"
                        onclick="alterarQuantidade(${item.produto_id}, ${item.quantidade + 1})"
                    >
                        +
                    </button>

                </div>

                <strong>
                    R$ ${formatarMoeda(item.preco * item.quantidade)}
                </strong>

                <button
                    type="button"
                    onclick="removerProduto(${item.produto_id})"
                >
                    ×
                </button>
            `;

            lista.appendChild(linha);
        });
    }

    atualizarTotais();
}

// ============================================================
// ATUALIZAR TOTAIS
// ============================================================

function atualizarTotais() {
    const subtotal = calcularSubtotal();
    const total = calcularTotalVenda();

    const elementoSubtotal = document.getElementById("subtotal");

    const elementoDesconto = document.getElementById("desconto");

    const elementoTotal =
        document.getElementById("totalVenda") || document.getElementById("valorTotal");

    if (elementoSubtotal) {
        elementoSubtotal.textContent = `R$ ${formatarMoeda(subtotal)}`;
    }

    if (elementoDesconto) {
        elementoDesconto.textContent = `R$ ${formatarMoeda(descontoAtual)}`;
    }

    if (elementoTotal) {
        elementoTotal.textContent = `R$ ${formatarMoeda(total)}`;
    }
}

// ============================================================
// DESCONTO
// ============================================================

function definirDesconto(valor) {
    descontoAtual = Number(valor) || 0;

    atualizarTotais();
}

// ============================================================
// CAIXA
// ============================================================

async function carregarCaixaAtual() {
    try {
        const resposta = await fetch("/caixas");

        if (!resposta.ok) {
            console.warn("Não foi possível carregar caixas.");

            return;
        }

        const dados = await resposta.json();

        const caixas = Array.isArray(dados) ? dados : dados.caixas || dados.data || [];

        caixaAtual =
            caixas.find((caixa) => String(caixa.status).toUpperCase() === "ABERTO") || null;

        console.log("Caixa atual:", caixaAtual);

        atualizarCaixaNaTela();
    } catch (erro) {
        console.error("Erro ao carregar caixa:", erro);
    }
}

// ============================================================
// ATUALIZAR CAIXA NA TELA
// ============================================================

function atualizarCaixaNaTela() {
    const elemento = document.getElementById("caixaAtual");

    if (!elemento) {
        return;
    }

    if (!caixaAtual) {
        elemento.textContent = "Nenhum caixa aberto";

        return;
    }

    elemento.textContent = caixaAtual.nome || caixaAtual.codigo || `Caixa ${caixaAtual.id}`;
}

// ============================================================
// FINALIZAR VENDA
// ============================================================

async function finalizarVenda() {
    if (vendaEmProcessamento) {
        return;
    }

    if (!funcionarioAtual) {
        alert("Selecione o funcionário antes de finalizar a venda.");

        abrirModalFuncionario();

        return;
    }

    if (!caixaAtual) {
        alert("Não existe caixa aberto para realizar a venda.");

        return;
    }

    if (!carrinho.length) {
        alert("Adicione pelo menos um produto ao carrinho.");

        return;
    }

    if (!formaPagamentoAtual) {
        alert("Selecione a forma de pagamento.");

        return;
    }

    // ========================================================
    // DINHEIRO
    // ========================================================

    if (formaPagamentoAtual === "DINHEIRO" && !window.trocoConfirmado) {
        abrirModalTroco();

        return;
    }

    vendaEmProcessamento = true;

    try {
        const venda = {
            cliente_id: null,

            caixa_id: caixaAtual.id ?? caixaAtual.caixa_id,

            funcionario_id: funcionarioAtual.id,

            desconto: Number(descontoAtual) || 0,

            forma_pagamento: formaPagamentoAtual,

            itens: carrinho.map((item) => ({
                produto_id: item.produto_id,

                quantidade: Number(item.quantidade),
            })),
        };

        console.log("Venda enviada:", venda);

        const resposta = await fetch("/salesV2", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(venda),
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.erro || resultado.error || "Erro ao registrar venda.");
        }

        console.log("Venda registrada:", resultado);

        alert("Venda finalizada com sucesso!");

        finalizarLimpezaVenda();
    } catch (erro) {
        console.error("Erro ao finalizar venda:", erro);

        alert(`Erro ao finalizar venda:\n${erro.message}`);
    } finally {
        vendaEmProcessamento = false;
    }
}

// ============================================================
// LIMPAR VENDA
// ============================================================

function finalizarLimpezaVenda() {
    carrinho = [];

    descontoAtual = 0;

    formaPagamentoAtual = null;

    window.trocoConfirmado = false;

    window.valorRecebido = 0;

    atualizarCarrinho();

    fecharModalTroco();
}

// ============================================================
// CANCELAR VENDA
// ============================================================

function cancelarVenda() {
    if (!carrinho.length) {
        return;
    }

    const confirmar = confirm("Deseja realmente cancelar esta venda?");

    if (!confirmar) {
        return;
    }

    carrinho = [];

    descontoAtual = 0;

    formaPagamentoAtual = null;

    window.trocoConfirmado = false;

    window.valorRecebido = 0;

    atualizarCarrinho();

    fecharModalTroco();

    console.log("Venda cancelada.");
}

// ============================================================
// TROCO
// ============================================================

function abrirModalTroco() {
    const modal = document.getElementById("modalTroco");

    if (!modal) {
        console.error("Modal de troco não encontrado.");

        // Se o modal não existir, permite finalizar
        // somente quando não for necessário calcular troco.
        return;
    }

    const total = calcularTotalVenda();

    const campoTotal = document.getElementById("trocoTotalVenda");

    const campoRecebido = document.getElementById("valorRecebido");

    const campoTroco = document.getElementById("valorTroco");

    if (campoTotal) {
        campoTotal.value = formatarMoeda(total);
    }

    if (campoRecebido) {
        campoRecebido.value = "";

        campoRecebido.focus();

        campoRecebido.oninput = calcularTroco;
    }

    if (campoTroco) {
        campoTroco.value = "0,00";
    }

    modal.style.display = "flex";

    calcularTroco();
}

// ============================================================
// CALCULAR TROCO
// ============================================================

function calcularTroco() {
    const total = calcularTotalVenda();

    const campoRecebido = document.getElementById("valorRecebido");

    const campoTroco = document.getElementById("valorTroco");

    const mensagem = document.getElementById("mensagemTroco");

    if (!campoRecebido) {
        return;
    }

    const recebido = converterMoeda(campoRecebido.value);

    const troco = recebido - total;

    if (campoTroco) {
        campoTroco.value = formatarMoeda(Math.max(troco, 0));
    }

    if (mensagem) {
        if (recebido < total) {
            mensagem.textContent = `Falta R$ ${formatarMoeda(total - recebido)}`;
        } else {
            mensagem.textContent = "Troco disponível.";
        }
    }

    const btnConfirmar = document.getElementById("btnConfirmarTroco");

    if (btnConfirmar) {
        btnConfirmar.disabled = recebido < total;
    }
}

// ============================================================
// CONFIRMAR TROCO
// ============================================================

function confirmarTroco() {
    const total = calcularTotalVenda();

    const campoRecebido = document.getElementById("valorRecebido");

    if (!campoRecebido) {
        return;
    }

    const recebido = converterMoeda(campoRecebido.value);

    if (recebido < total) {
        alert("O valor recebido é menor que o valor da venda.");

        return;
    }

    window.valorRecebido = recebido;

    window.trocoConfirmado = true;

    fecharModalTroco();

    finalizarVenda();
}

// ============================================================
// FECHAR MODAL TROCO
// ============================================================

function fecharModalTroco() {
    const modal = document.getElementById("modalTroco");

    if (modal) {
        modal.style.display = "none";
    }
}

// ============================================================
// CONFIGURAR BOTÕES DO TROCO
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    const btnConfirmar = document.getElementById("btnConfirmarTroco");

    const btnCancelar = document.getElementById("btnCancelarTroco");

    if (btnConfirmar) {
        btnConfirmar.addEventListener("click", confirmarTroco);
    }

    if (btnCancelar) {
        btnCancelar.addEventListener("click", () => {
            window.trocoConfirmado = false;

            window.valorRecebido = 0;

            fecharModalTroco();
        });
    }
});

// ============================================================
// UTILITÁRIOS
// ============================================================

function formatarMoeda(valor) {
    return Number(valor || 0)
        .toFixed(2)
        .replace(".", ",");
}

function converterMoeda(valor) {
    if (typeof valor === "number") {
        return valor;
    }

    if (!valor) {
        return 0;
    }

    let texto = String(valor).trim().replace(/\s/g, "");

    // 1.234,56
    if (texto.includes(".") && texto.includes(",")) {
        texto = texto.replace(/\./g, "").replace(",", ".");
    }

    // 123,45
    else if (texto.includes(",")) {
        texto = texto.replace(",", ".");
    }

    const numero = Number(texto);

    return Number.isFinite(numero) ? numero : 0;
}

function escaparHTML(texto) {
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ============================================================
// EXPOR FUNÇÕES PARA HTML
// ============================================================

window.adicionarProduto = adicionarProduto;

window.removerProduto = removerProduto;

window.alterarQuantidade = alterarQuantidade;

window.finalizarVenda = finalizarVenda;

window.cancelarVenda = cancelarVenda;

window.selecionarFuncionario = selecionarFuncionario;

window.abrirModalFuncionario = abrirModalFuncionario;

window.fecharModalFuncionario = fecharModalFuncionario;

window.abrirModalTroco = abrirModalTroco;

window.fecharModalTroco = fecharModalTroco;

window.calcularTroco = calcularTroco;

window.confirmarTroco = confirmarTroco;

window.definirDesconto = definirDesconto;

// ============================================================
// RECUPERAR FUNCIONÁRIO AO CARREGAR
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    recuperarFuncionarioSalvo();
});

console.log("app.js do PDV carregado sem duplicação.");

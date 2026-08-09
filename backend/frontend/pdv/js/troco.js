// ==========================================
// Adega24hSystem - Troco Automático
// ==========================================

(function () {
    let formaPagamentoTroco = "PIX";

    const btnPix = document.getElementById("btnPix");
    const btnDinheiro = document.getElementById("btnDinheiro");
    const btnCartao = document.getElementById("btnCartao");
    const btnFinalizar = document.getElementById("btnFinalizar");

    const totalVenda = document.getElementById("totalVenda");

    const modalTroco = document.getElementById("modalTroco");
    const trocoTotalVenda = document.getElementById("trocoTotalVenda");
    const valorRecebido = document.getElementById("valorRecebido");
    const valorTroco = document.getElementById("valorTroco");
    const mensagemTroco = document.getElementById("mensagemTroco");

    const btnConfirmarTroco = document.getElementById("btnConfirmarTroco");

    const btnCancelarTroco = document.getElementById("btnCancelarTroco");

    // ==========================================
    // PIX
    // ==========================================

    if (btnPix) {
        btnPix.addEventListener("click", function () {
            formaPagamentoTroco = "PIX";

            console.log("Pagamento selecionado: PIX");
        });
    }

    // ==========================================
    // DINHEIRO
    // ==========================================

    if (btnDinheiro) {
        btnDinheiro.addEventListener("click", function () {
            formaPagamentoTroco = "DINHEIRO";

            console.log("Pagamento selecionado: DINHEIRO");
        });
    }

    // ==========================================
    // CARTÃO
    // ==========================================

    if (btnCartao) {
        btnCartao.addEventListener("click", function () {
            formaPagamentoTroco = "CARTAO";

            console.log("Pagamento selecionado: CARTAO");
        });
    }

    // ==========================================
    // CONVERTER VALOR
    // ==========================================

    function converterValor(valor) {
        if (!valor) {
            return 0;
        }

        let texto = valor.toString().replace("R$", "").replace(/\s/g, "");

        // Se tiver vírgula, usamos o padrão brasileiro:
        // 1.234,56 -> 1234.56
        if (texto.includes(",")) {
            texto = texto.replace(/\./g, "").replace(",", ".");
        } else {
            // Se não tiver vírgula, mantém o ponto decimal:
            // 5.00 -> 5
            // 13.00 -> 13
            // 20.00 -> 20

            texto = texto.replace(/[^\d.-]/g, "");
        }

        return Number(texto) || 0;
    }
    // ==========================================
    // PEGAR TOTAL DA VENDA
    // ==========================================

    function obterTotalVenda() {
        return converterValor(totalVenda.textContent);
    }

    // ==========================================
    // ABRIR MODAL DE TROCO
    // ==========================================

    function abrirModalTroco() {
        const total = obterTotalVenda();

        if (total <= 0) {
            alert("Não há produtos no carrinho.");

            return;
        }

        trocoTotalVenda.textContent = "R$ " + total.toFixed(2).replace(".", ",");

        valorRecebido.value = "";

        valorTroco.textContent = "R$ 0,00";

        mensagemTroco.textContent = "";

        mensagemTroco.className = "";

        modalTroco.classList.add("ativo");

        setTimeout(function () {
            valorRecebido.focus();
        }, 100);
    }

    // ==========================================
    // FECHAR MODAL
    // ==========================================

    function fecharModalTroco() {
        modalTroco.classList.remove("ativo");

        valorRecebido.value = "";

        valorTroco.textContent = "R$ 0,00";

        mensagemTroco.textContent = "";
    }

    // ==========================================
    // CALCULAR TROCO AUTOMATICAMENTE
    // ==========================================

    function calcularTroco() {
        const total = obterTotalVenda();

        const recebido = converterValor(valorRecebido.value);

        if (recebido <= 0) {
            valorTroco.textContent = "R$ 0,00";

            mensagemTroco.textContent = "";

            return;
        }

        const troco = recebido - total;

        if (troco < 0) {
            valorTroco.textContent = "R$ 0,00";

            mensagemTroco.textContent =
                "Valor insuficiente. Faltam R$ " + Math.abs(troco).toFixed(2).replace(".", ",");

            mensagemTroco.className = "troco-erro";

            return;
        }

        valorTroco.textContent = "R$ " + troco.toFixed(2).replace(".", ",");

        mensagemTroco.textContent = "Pagamento suficiente.";

        mensagemTroco.className = "troco-ok";
    }

    // ==========================================
    // DIGITAÇÃO DO DINHEIRO
    // ==========================================

    if (valorRecebido) {
        valorRecebido.addEventListener("input", calcularTroco);
    }

    // ==========================================
    // F12 FINALIZAR
    // ==========================================

    if (btnFinalizar) {
        btnFinalizar.addEventListener(
            "click",
            function (evento) {
                // PIX e CARTÃO continuam usando
                // o funcionamento original.

                if (formaPagamentoTroco !== "DINHEIRO") {
                    return;
                }

                // Impede a finalização original
                // enquanto o valor do dinheiro não for informado.

                evento.preventDefault();

                evento.stopImmediatePropagation();

                abrirModalTroco();
            },
            true
        );
    }

    // ==========================================
    // CONFIRMAR PAGAMENTO
    // ==========================================

    if (btnConfirmarTroco) {
        btnConfirmarTroco.addEventListener("click", function () {
            const total = obterTotalVenda();

            const recebido = converterValor(valorRecebido.value);

            if (recebido < total) {
                alert("O valor recebido é insuficiente.");

                valorRecebido.focus();

                return;
            }

            const troco = recebido - total;

            console.log("Valor recebido:", recebido);

            console.log("Troco:", troco);

            fecharModalTroco();

            // Chama a função original
            // que já está funcionando.

            if (typeof finalizarVenda === "function") {
                finalizarVenda();
            }
        });
    }

    // ==========================================
    // CANCELAR
    // ==========================================

    if (btnCancelarTroco) {
        btnCancelarTroco.addEventListener("click", function () {
            fecharModalTroco();
        });
    }

    console.log("Módulo de troco automático carregado!");
})();

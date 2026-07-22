async function carregarDashboard() {
    try {
        // Produtos
        const respostaProdutos = await fetch("/products");
        const produtos = await respostaProdutos.json();

        document.getElementById("totalProdutos").innerHTML = produtos.length;

        // Estoque total
        let estoqueTotal = 0;

        produtos.forEach((produto) => {
            estoqueTotal += produto.estoque;
        });

        document.getElementById("estoqueTotal").innerHTML = estoqueTotal;

        // Status do sistema
        const respostaStatus = await fetch("/status");
        const status = await respostaStatus.json();

        document.getElementById("statusSistema").innerHTML = status.status;

        document.getElementById("edicaoSistema").innerHTML = status.edicao;
    } catch (erro) {
        console.error("Erro ao carregar Dashboard:", erro);
    }
}

carregarDashboard();

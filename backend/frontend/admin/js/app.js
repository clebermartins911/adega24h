document.addEventListener("DOMContentLoaded", () => {
    carregarComponente("header", "components/header.html");
    carregarComponente("sidebar", "components/sidebar.html");
    carregarComponente("footer", "components/footer.html");
    carregarPagina("dashboard");
});

async function carregarComponente(id, arquivo) {
    try {
        const resposta = await fetch(arquivo);

        if (!resposta.ok) {
            throw new Error(`Erro ao carregar ${arquivo}`);
        }

        const html = await resposta.text();

        document.getElementById(id).innerHTML = html;
    } catch (erro) {
        console.error(erro);

        document.getElementById(id).innerHTML =
            `<p style="color:red">Erro ao carregar ${arquivo}</p>`;
    }
}

// Executa funções específicas de cada página
function executarScriptsPagina(nome) {
    if (nome === "produtos" && typeof carregarProdutos === "function") {
        carregarProdutos();
    }

    if (nome === "caixas" && typeof carregarCaixas === "function") {
        carregarCaixas();
    }

    if (nome === "categorias" && typeof carregarCategorias === "function") {
        carregarCategorias();
    }

    if (nome === "estoque" && typeof carregarEstoque === "function") {
        carregarEstoque();
    }

    if (nome === "clientes" && typeof carregarClientes === "function") {
        carregarClientes();
    }

    if (nome === "fornecedores" && typeof carregarFornecedores === "function") {
        carregarFornecedores();
    }

    if (nome === "vendas" && typeof carregarVendas === "function") {
        carregarVendas();
    }

    if (nome === "financeiro" && typeof carregarFinanceiro === "function") {
        carregarFinanceiro();
    }
}

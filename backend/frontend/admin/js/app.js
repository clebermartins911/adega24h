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
    if (nome === "produtos") {
        if (typeof carregarProdutos === "function") {
            carregarProdutos();
        }
    }

    if (nome === "caixas") {
        if (typeof carregarCaixas === "function") {
            carregarCaixas();
        }
    }
}

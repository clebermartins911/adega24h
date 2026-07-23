async function carregarPagina(nome) {
    try {
        const resposta = await fetch(`pages/${nome}.html`);

        if (!resposta.ok) {
            throw new Error("Página não encontrada");
        }

        const html = await resposta.text();

        document.getElementById("content").innerHTML = html;
        executarScriptsPagina(nome);

        const scripts = document.getElementById("content").querySelectorAll("script");

        scripts.forEach((script) => {
            const novoScript = document.createElement("script");

            if (script.src) {
                novoScript.src = script.src;
            } else {
                novoScript.textContent = script.textContent;
            }

            document.body.appendChild(novoScript);
        });
    } catch (erro) {
        document.getElementById("content").innerHTML = `
            <h2>Erro</h2>
            <p>${erro.message}</p>
        `;
    }
}

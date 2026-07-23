async function carregarCaixas() {
    const resposta = await fetch("/caixas");
    const caixas = await resposta.json();

    const tabela = document.getElementById("listaCaixas");

    tabela.innerHTML = "";

    caixas.forEach((caixa) => {
        tabela.innerHTML += `
            <tr>
                <td>${caixa.id}</td>
                <td>${caixa.codigo}</td>
                <td>${caixa.nome}</td>
                <td>${caixa.status}</td>
            </tr>
        `;
    });
}

carregarCaixas();

document.getElementById("salvarCaixa").addEventListener("click", async () => {
    const caixa = {
        codigo: document.getElementById("codigo").value,

        nome: document.getElementById("nome").value,
    };

    const resposta = await fetch("/caixas", {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(caixa),
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
        alert(resultado.erro);
        return;
    }

    alert(resultado.mensagem);

    document.getElementById("codigo").value = "";
    document.getElementById("nome").value = "";

    carregarCaixas();
});

async function carregarCaixas() {
    const tabela = document.getElementById("listaCaixas");

    if (!tabela) {
        return;
    }

    const resposta = await fetch("/caixas");
    const caixas = await resposta.json();

    tabela.innerHTML = "";

    caixas.forEach((caixa) => {
        tabela.innerHTML += `
            <tr>
                <td>${caixa.id}</td>
                <td>${caixa.codigo}</td>
                <td>${caixa.nome}</td>
                <td>${caixa.status}</td>
                <td>
                    ${
                        caixa.status === "ABERTO"
                            ? `<button onclick="fecharCaixa(${caixa.id})">Fechar Caixa</button>`
                            : `<button onclick="abrirCaixa(${caixa.id})">Abrir Caixa</button>`
                    }
                </td>
            </tr>
        `;
    });
}

async function abrirCaixa(id) {
    const resposta = await fetch(`/caixas/${id}/abrir`, {
        method: "POST",
    });

    const resultado = await resposta.json();

    alert(resultado.mensagem);

    carregarCaixas();
}

async function fecharCaixa(id) {
    const resposta = await fetch(`/caixas/${id}/fechar`, {
        method: "POST",
    });

    const resultado = await resposta.json();

    alert(resultado.mensagem);

    carregarCaixas();
}

carregarCaixas();

const botaoSalvar = document.getElementById("salvarCaixa");

if (botaoSalvar) {
    botaoSalvar.addEventListener("click", async () => {
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
}

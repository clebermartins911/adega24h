const API = "http://localhost:3000/employees";

const tabela = document.querySelector("#tabelaFuncionarios tbody");
const form = document.getElementById("formFuncionario");

async function carregarFuncionarios() {
    const resposta = await fetch(API);
    const funcionarios = await resposta.json();

    tabela.innerHTML = "";

    funcionarios.forEach((funcionario) => {
        tabela.innerHTML += `
            <tr>
                <td>${funcionario.nome}</td>
                <td>${funcionario.usuario}</td>
                <td>${funcionario.cargo}</td>
                <td>${funcionario.permissao}</td>
                <td>${funcionario.ativo ? "Ativo" : "Inativo"}</td>
            </tr>
        `;
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const funcionario = {
        nome: document.getElementById("nome").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        usuario: document.getElementById("usuario").value,
        senha: document.getElementById("senha").value,
        cargo: document.getElementById("cargo").value,
        permissao: document.getElementById("permissao").value,
        ativo: 1,
    };

    const resposta = await fetch(API, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(funcionario),
    });

    const resultado = await resposta.json();

    alert(resultado.mensagem);

    form.reset();

    carregarFuncionarios();
});

carregarFuncionarios();

async function carregarCategorias() {
    try {
        const resposta = await fetch("/categories");
        const categorias = await resposta.json();

        const tabela = document.getElementById("listaCategorias");

        if (!tabela) return;

        tabela.innerHTML = "";

        categorias.forEach((categoria) => {
            tabela.innerHTML += `
                <tr>
                    <td>${categoria.id}</td>
                    <td>${categoria.nome}</td>
                    <td>
                        <button onclick="editarCategoria(${categoria.id})">✏️ Editar</button>
                        <button onclick="excluirCategoria(${categoria.id})">🗑️ Excluir</button>
                    </td>
                </tr>
            `;
        });
    } catch (erro) {
        console.error("Erro ao carregar categorias:", erro);
    }
}
async function editarCategoria(id) {
    const resposta = await fetch(`/categories/${id}`);
    const categoria = await resposta.json();

    const novoNome = prompt("Editar categoria:", categoria.nome);

    if (!novoNome || !novoNome.trim()) return;

    await fetch(`/categories/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: novoNome.trim(),
        }),
    });

    carregarCategorias();
}
async function novaCategoria() {
    console.log("Botão Nova Categoria clicado");

    const nome = prompt("Nome da nova categoria:");

    if (!nome || !nome.trim()) return;

    await fetch("/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: nome.trim(),
        }),
    });

    carregarCategorias();
}

async function excluirCategoria(id) {
    const confirmar = confirm("Deseja excluir esta categoria?");

    if (!confirmar) return;

    await fetch(`/categories/${id}`, {
        method: "DELETE",
    });

    carregarCategorias();
}

const listaCategorias = document.getElementById("listaCategorias");

if (listaCategorias) {
    carregarCategorias();
}
setTimeout(() => {
    const botaoNovaCategoria = document.getElementById("novaCategoria");

    if (botaoNovaCategoria) {
        botaoNovaCategoria.onclick = novaCategoria;
    }
}, 100);

async function carregarProdutos() {
    try {
        const resposta = await fetch("/products");

        const produtos = await resposta.json();

        const tabela = document.getElementById("listaProdutos");

        if (!tabela) {
            return;
        }

        tabela.innerHTML = "";

        produtos.forEach((produto) => {
            tabela.innerHTML += `

                <tr>

                    <td>${produto.id}</td>

                    <td>${produto.nome}</td>

                    <td>${produto.categoria}</td>

                    <td>R$ ${produto.preco}</td>

                    <td>${produto.estoque}</td>


                    <td>

                        <button onclick="editarProduto(${produto.id})">
                            ✏ Editar
                        </button>


                        <button onclick="excluirProduto(${produto.id})">
                            🗑 Excluir
                        </button>

                    </td>

                </tr>

            `;
        });
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
    }
}

function editarProduto(id) {
    alert("Editar produto ID: " + id);
}

async function excluirProduto(id) {
    const confirmar = confirm("Deseja excluir este produto?");

    if (!confirmar) {
        return;
    }

    await fetch(`/products/${id}`, {
        method: "DELETE",
    });

    carregarProdutos();
}

const listaProdutos = document.getElementById("listaProdutos");

if (listaProdutos) {
    carregarProdutos();
}

const novoProduto = document.getElementById("novoProduto");

if (novoProduto) {
    novoProduto.addEventListener("click", () => {
        carregarPagina("novo-produto");
    });
}

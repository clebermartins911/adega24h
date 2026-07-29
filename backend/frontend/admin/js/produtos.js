async function carregarProdutos() {
    try {
        console.log("1 - Iniciou");

        const resposta = await fetch("/products");
        console.log("2 - Fetch OK");

        const produtos = await resposta.json();
        console.log("3 - Produtos:", produtos);

        const tabela = document.getElementById("listaProdutos");
        console.log("4 - Tabela:", tabela);

        tabela.innerHTML = "";

        produtos.forEach((produto) => {
            console.log("Produto:", produto);

            tabela.innerHTML += `
                <tr>
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.codigo_barras || "-"}</td>
                    <td>${produto.categoria}</td>
                    <td>R$ ${produto.preco}</td>
                    <td>${produto.estoque}</td>
                    <td>
                        <button onclick="editarProduto(${produto.id})">Editar</button>
                    </td>
                </tr>
            `;
        });

        console.log("5 - Finalizou");
    } catch (erro) {
        console.error("ERRO:", erro);
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

async function carregarCategorias() {
    const resposta = await fetch("/categories");
    const categorias = await resposta.json();

    const select = document.getElementById("categoria");

    categorias.forEach((categoria) => {
        const option = document.createElement("option");

        option.value = categoria.id;
        option.textContent = categoria.nome;

        select.appendChild(option);
    });
}

carregarCategorias();

document.getElementById("salvarProduto").addEventListener("click", async () => {
    const produto = {
        nome: document.getElementById("nome").value,

        categoria_id: Number(document.getElementById("categoria").value),

        preco: Number(document.getElementById("preco").value),

        custo: Number(document.getElementById("custo").value),

        estoque: Number(document.getElementById("estoque").value),

        estoque_minimo: Number(document.getElementById("estoque_minimo").value),
    };

    try {
        const resposta = await fetch("/products", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(produto),
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(resultado.erro);
            return;
        }

        alert("Produto cadastrado com sucesso!");

        window.location.href = "/admin";
    } catch (erro) {
        console.error(erro);

        alert("Erro ao cadastrar produto");
    }
});

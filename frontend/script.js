let carrinho = [];
let total = 0;

fetch("http://localhost:3000/products")
.then(res => res.json())
.then(produtos => {

    const area = document.getElementById("produtos");

    produtos.forEach(produto => {

        area.innerHTML += `
        <div class="produto">

            <h3>${produto.nome}</h3>

            <p>💰 R$ ${produto.preco.toFixed(2)}</p>

            <p>📦 Estoque: ${produto.estoque}</p>

            <button onclick='adicionarCarrinho(${JSON.stringify(produto)})'>
                Comprar
            </button>

        </div>
        `;

    });

})
.catch(erro => {
    console.log("Erro ao carregar produtos:", erro);
});


// Adiciona produto ao carrinho
function adicionarCarrinho(produto){

    carrinho.push(produto);

    atualizarCarrinho();

}


// Atualiza a tela do carrinho
function atualizarCarrinho(){

    const area = document.getElementById("carrinho");

    area.innerHTML = "";

    total = 0;


    carrinho.forEach(produto => {

        area.innerHTML += `
        <p>
        ${produto.nome} - R$ ${produto.preco.toFixed(2)}
        </p>
        `;

        total += produto.preco;

    });


    document.getElementById("total").innerHTML =
    "Total: R$ " + total.toFixed(2);


}


// Finalizar compra
function finalizarCompra(){

    if(carrinho.length === 0){

        alert("Carrinho vazio!");

        return;
    }


    alert(
        "Compra realizada com sucesso!\n\n" +
        "Valor total: R$ " +
        total.toFixed(2)
    );


    carrinho = [];

    atualizarCarrinho();

}
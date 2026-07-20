const productModel = require("./models/productModel");

productModel.buscarPorId(22, (err, produto) => {
    if (err) {
        console.log("Erro:", err);
        return;
    }

    console.log("Produto encontrado:");
    console.log(produto);
});
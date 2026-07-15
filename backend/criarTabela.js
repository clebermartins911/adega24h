const db = require("./database");



// Criar tabela de produtos
db.run(`
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco REAL NOT NULL,
    estoque INTEGER NOT NULL
)
`, (err) => {

    if (err) {
        console.log("Erro ao criar tabela products:", err.message);
    } else {
        console.log("Tabela products criada com sucesso!");
    }

});



// Criar tabela de vendas
db.run(`
CREATE TABLE IF NOT EXISTS sales (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    produto_id INTEGER NOT NULL,

    quantidade INTEGER NOT NULL,

    valor_total REAL NOT NULL,

    data_venda TEXT NOT NULL

)
`, (err) => {

    if (err) {
        console.log("Erro ao criar tabela sales:", err.message);
    } else {
        console.log("Tabela sales criada com sucesso!");
    }

});

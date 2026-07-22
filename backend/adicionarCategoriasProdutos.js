const db = require("./database");

const categorias = [
    "Refrigerantes",
    "Energéticos",
    "Águas",
    "Vinhos",
    "Destilados",
    "Salgados",
    "Doces",
    "Chocolates",
    "Snacks",
    "Congelados",
    "Mantimentos"
];

categorias.forEach((nome) => {

    db.get(
        "SELECT id FROM categories WHERE nome = ?",
        [nome],
        (err, row) => {

            if (err) {
                console.log(err);
                return;
            }

            if (!row) {

                db.run(
                    "INSERT INTO categories (nome) VALUES (?)",
                    [nome],
                    function(err) {

                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Criada:", nome);
                        }

                    }
                );

            } else {
                console.log("Já existe:", nome);
            }

        }
    );

});

setTimeout(() => {
    db.close();
}, 1000);
const db = require("./database");

db.all(
    `
SELECT 
p.id,
p.nome,
COUNT(s.id) AS vendas
FROM products p
LEFT JOIN sales s ON s.produto_id = p.id
GROUP BY p.id
ORDER BY p.id
`,
    (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }

        console.table(rows);
    }
);

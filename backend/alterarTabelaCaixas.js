const db = require("./database");

db.serialize(() => {

    db.run(`
        ALTER TABLE caixas 
        ADD COLUMN aberto_em TEXT
    `);

    db.run(`
        ALTER TABLE caixas 
        ADD COLUMN fechado_em TEXT
    `);

    console.log("Campos de abertura e fechamento adicionados!");

});
const config = require("./systemConfig");

function carregarSistema() {
    console.log("Carregando:", config.nomeSistema);
    console.log("Modo:", config.tipoSistema);

    if (config.tipoSistema === "store") {
        const store = require("../store/services/storeService");

        store.iniciarLoja();
    }

    if (config.tipoSistema === "auto") {
        const auto = require("../auto/services/autoService");

        auto.iniciarAuto();
    }
}

module.exports = carregarSistema;

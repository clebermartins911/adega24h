const systemConfig = require("../config/systemConfig");

function loadEditionModule() {
    const edition = systemConfig.edition;

    switch (edition) {
        case "PDV":
            return require("../../modules/pdv");

        case "AUTO":
            return require("../../modules/auto");

        case "ENTERPRISE":
            return require("../../modules/enterprise");

        default:
            throw new Error("Edição não encontrada: " + edition);
    }
}

module.exports = {
    loadEditionModule,
};

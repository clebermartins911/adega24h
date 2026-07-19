const systemConfig = require("../config/systemConfig");

function getEdition() {
    return systemConfig.edition;
}

function isEdition(edition) {
    return systemConfig.edition === edition;
}

function isPDV() {
    return isEdition("PDV");
}

function isAUTO() {
    return isEdition("AUTO");
}

function isEnterprise() {
    return isEdition("ENTERPRISE");
}

module.exports = {
    getEdition,
    isEdition,
    isPDV,
    isAUTO,
    isEnterprise,
};

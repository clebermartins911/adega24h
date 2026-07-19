const systemConfig = require("../config/systemConfig");
const moduleRegistry = require("../config/moduleRegistry");

function getActiveModules() {
    const edition = systemConfig.edition;

    return {
        edition,
        modules: systemConfig.modules,
        features: moduleRegistry[edition],
    };
}

module.exports = {
    getActiveModules,
};

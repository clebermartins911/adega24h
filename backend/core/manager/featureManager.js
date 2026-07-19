const { getActiveModules } = require("../utils/moduleLoader");

function getFeatures() {
    const config = getActiveModules();

    return config.features || {};
}

function hasFeature(feature) {
    const features = getFeatures();

    return features[feature] === true;
}

module.exports = {
    getFeatures,
    hasFeature,
};

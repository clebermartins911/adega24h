const accessControl = {
    doorLocked: true,

    lockDoor() {
        this.doorLocked = true;

        return {
            status: "Porta bloqueada",
            locked: true,
        };
    },

    unlockDoor() {
        this.doorLocked = false;

        return {
            status: "Porta liberada",
            locked: false,
        };
    },

    getStatus() {
        return {
            locked: this.doorLocked,
        };
    },
};

module.exports = accessControl;

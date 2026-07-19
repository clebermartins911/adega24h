const express = require("express");
const router = express.Router();

const door = require("../modules/auto/accessControl");

// Status da porta
router.get("/door/status", (req, res) => {
    res.json(door.getStatus());
});

// Liberar porta
router.post("/door/unlock", (req, res) => {
    res.json(door.unlockDoor());
});

// Bloquear porta
router.post("/door/lock", (req, res) => {
    res.json(door.lockDoor());
});

module.exports = router;

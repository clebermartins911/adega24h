const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");
const employeeLoginController = require("../controllers/employeeLoginController");
router.post("/login", employeeLoginController.login);
router.get("/", employeeController.listar);
router.get("/:id", employeeController.buscarPorId);
router.post("/", employeeController.cadastrar);
router.put("/:id", employeeController.atualizar);
router.delete("/:id", employeeController.excluir);

module.exports = router;

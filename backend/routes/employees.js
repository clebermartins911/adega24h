const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");

router.get("/", employeeController.listar);
router.get("/:id", employeeController.buscarPorId);
router.post("/", employeeController.cadastrar);
router.put("/:id", employeeController.atualizar);
router.delete("/:id", employeeController.excluir);

module.exports = router;

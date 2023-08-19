const express = require('express')

const employeeController = require('../controllers/employee.js')

const router = express.Router()

router.get("/", employeeController.getAll)
router.post("/", employeeController.add)
router.get("/:id", employeeController.get)
router.put("/:id", employeeController.update)
router.delete("/:id", employeeController.delete)

module.exports = router
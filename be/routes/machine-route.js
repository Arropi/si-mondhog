import { Router } from 'express'
import { addMachine, deleteMachine, getMachineById, getMachines, updateMachine } from '../controllers/machine-controller.js'
import { machineCreateValidation, machineUpdateValidation } from '../validations/machine-validation.js'

const router = Router()

router.get("/", getMachines)
router.get("/:_id", getMachineById)
router.post("/", machineCreateValidation, addMachine)
router.put("/:_id", machineUpdateValidation, updateMachine)
router.delete("/:_id", deleteMachine)
export default router
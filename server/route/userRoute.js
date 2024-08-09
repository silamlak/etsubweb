import express from "express";
const router = express.Router()
import {getoffers, getService, purchaseItem, ViewService} from '../controller/userController.js'
import {purchaseValidationRules} from '../validation/userValidation.js'
router.get('/service', getService)
router.get("/offer", getoffers);
router.get("/service/:id", ViewService);

router.post("/purchase",purchaseValidationRules, purchaseItem);

export default router
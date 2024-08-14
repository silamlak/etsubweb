import express from "express";
const router = express.Router()
import {getCategory, getNewService, getoffers, getOrderdService, getService, purchaseItem, searchItems, ViewService} from '../controller/userController.js'
import {purchaseValidationRules} from '../validation/userValidation.js'
import { verifyJWT } from "../middleware/verifyToken.js";

router.get("/page/check", verifyJWT);

router.get('/service', getService)
router.get("/offer", getoffers);
router.get("/service/:id", ViewService);

router.get("/product/new", getNewService);
router.get("/order/get", verifyJWT, getOrderdService);
router.get("/search/service", searchItems);
router.get("/category/get", getCategory);

router.post("/purchase", verifyJWT, purchaseItem);

export default router
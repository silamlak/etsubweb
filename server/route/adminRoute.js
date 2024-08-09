import express from "express";
import {
  addOffer,
  addService,
  getCatagorie,
  ViewCatagorie,
  addCatagorie,
  deleteOffer,
  getPurchased,
  ViewPurchased,
  deleteService,
  getOffer,
  getService,
  updateCatagorie,
  removeDiscount,
  updateDiscount,
  updateOffer,
  updateService,
  ViewOffer,
  deleteCatagorie,
  ViewService,
  deletePurchased,
  getCustomers,
  deleteCustomers,
  ViewCustomer,
} from "../controller/adminController.js";
import {
  addOfferValidator,
  addServiceValidator,
  addCatagorieValidator,
} from "../validation/adminValidation.js";
import { getCategorySalesDistribution, getSalesAndRevenue, getTotals, topPendingOrders, topUsers } from "../controller/dashboardController.js";
import { verifyJWT } from "../middleware/verifyToken.js";
const router = express.Router()

//service
router.post("/service/add", verifyJWT, addServiceValidator, addService);
router.get("/service/get/:id", verifyJWT, ViewService);
router.put("/service/edit/:id", verifyJWT, updateService);
router.delete("/service/remove/:id", verifyJWT, deleteService);
router.get("/service/get", verifyJWT, getService);

//order
router.get("/order/get", verifyJWT, getPurchased);
router.post("/order/delete", verifyJWT, deletePurchased);
router.get("/order/get/:id", verifyJWT, ViewPurchased);

//offer
router.put("/service/offer/edit/:id", updateOffer);
router.delete("/service/offer/remove/:id", deleteOffer);
router.get("/service/offer/get", getOffer);
router.post("/service/offer/add", addOfferValidator, addOffer);
router.get("/service/offer/get/:id", ViewOffer);

//discount
router.put("/service/discount/edit/:id", updateDiscount);
router.put("/service/discount/remove/:id", removeDiscount);

//catagorie
router.get("/catagorie/get", verifyJWT, getCatagorie);
router.post("/catagorie/add", verifyJWT, addCatagorieValidator, addCatagorie);
router.get("/catagorie/get/:id", verifyJWT, ViewCatagorie);
router.put("/catagorie/edit/:id", updateCatagorie);
router.delete("/catagorie/remove/:id", deleteCatagorie);

//dashboard
router.get("/dashboard/total/get", verifyJWT, getTotals);
router.get("/dashboard/catagory", verifyJWT, getCategorySalesDistribution);
router.get("/dashboard/top/users", verifyJWT, topUsers);
router.get("/dashboard/pendings", verifyJWT, topPendingOrders);
router.get("/dashboard/sales", verifyJWT, getSalesAndRevenue);

//customer
router.get("/customers/all", verifyJWT, getCustomers);
router.post("/customer/delete", verifyJWT, deleteCustomers);
router.get("/customer/get/:id", verifyJWT, ViewCustomer);

export default router
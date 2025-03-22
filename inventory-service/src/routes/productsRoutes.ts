import express from "express";
import {
  getProductsSummary,
  getProductFilters,
  getProducts,
} from "../controllers/productController";

const router = express.Router();

router.get("/", getProducts);
router.get("/summary", getProductsSummary);
router.get("/filters", getProductFilters);

export default router;

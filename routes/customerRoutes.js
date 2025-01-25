/** @format */

import {
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controller/customerController.js";
import { isAdmin, isUser } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/", isAdmin, getCustomers);
router.get("/:customerId", isUser, getCustomer);
router.put("/:customerId", isUser, updateCustomer);
router.delete("/:customerId", isAdmin, deleteCustomer);

export default router;

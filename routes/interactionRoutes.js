/** @format */

// routes/interactionRoutes.js

import express from "express";
import {
  createInteraction,
  getInteractions,
  getInteractionById,
} from "../controller/interactionController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to create a new interaction for a specific customer

router.post("/:customerId", isAdmin, createInteraction);
// Route to get all interactions
router.get("/", isAdmin, getInteractions);
// Route to get all interactions for a specific customer
router.get("/:customerId", isAdmin, getInteractionById);

export default router;

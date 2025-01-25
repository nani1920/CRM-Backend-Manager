/** @format */
import express from "express";

import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import interactionRoutes from "./routes/interactionRoutes.js";
import dotenv from "dotenv"; // Use import if using ESM
dotenv.config();
const app = express();
app.use(express.json());

app.use("/auth/", authRoutes);
app.use("/customers/", customerRoutes);
app.use("/interactions/", interactionRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on http://localhost:" + process.env.PORT);
});

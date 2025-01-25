/** @format */

import dotenv from "dotenv";
import config from "../config.js";
import { Sequelize, DataTypes } from "sequelize";

// Load environment variables from .env file
dotenv.config();

// Choose environment configuration (development or production)
const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

console.log(dbConfig);
// Create a Sequelize instance
const sequelize = new Sequelize(dbConfig);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((e) => {
    console.error("Unable to connect to the database:", e);
  });

export { sequelize, DataTypes };

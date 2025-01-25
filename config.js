/** @format */
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export default {
  development: {
    dialect: "mysql",
    host: process.env.DB_HOST || "localhost", // Use environment variable or fallback to localhost
    username: process.env.DB_USER || "root", // Use environment variable or fallback to root
    password: process.env.DB_PASSWORD || "", // Use environment variable or fallback to empty password
    database: process.env.DB_NAME || "crm_db", // Use environment variable or fallback to crm_db
    define: {
      timestamps: false, // If you don't want Sequelize to add timestamps
    },
  },
  production: {
    dialect: "mysql",
    host: process.env.DB_HOST || "localhost", // Use environment variable or fallback to localhost
    username: process.env.DB_USER || "root", // Use environment variable or fallback to root
    password: process.env.DB_PASSWORD || "", // Use environment variable or fallback to empty password
    database: process.env.DB_NAME || "crm_db", // Use environment variable or fallback to crm_db
    define: {
      timestamps: false, // If you don't want Sequelize to add timestamps
    },
  },
};

/** @format */

// config/config.js
import dotenv from "dotenv";

dotenv.config();

const config = {
  development: {
    dialect: "sqlite",
    storage: "./database.sqlite3",
  },
  test: {
    dialect: "sqlite",
    storage: "./test.sqlite3",
  },
  production: {
    dialect: "sqlite",
    storage: "./prod.sqlite3",
  },
};

export default config;

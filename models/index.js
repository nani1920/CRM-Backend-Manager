/** @format */

import config from "../config.js";
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(config.development);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully ");
  })
  .catch((e) => {
    console.log("unable to connect to the database", e);
  });

export { sequelize, DataTypes };

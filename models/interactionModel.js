/** @format */

import { sequelize, DataTypes } from "./index.js";

const Interaction = sequelize.define(
  "Interaction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    followUpDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Customers", // Foreign key to Customer model
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    timestamps: true, // Automatically manage created_at and updated_at
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Associations: Interaction belongs to a Customer
Interaction.associate = (models) => {
  Interaction.belongsTo(models.Customer, {
    foreignKey: "customerId",
  });
};

Interaction.sync({ alter: true }) // Using alter to update the table if needed
  .then(() => console.log("Interaction table created or updated"))
  .catch((err) => console.error("Error creating table:", err));

export default Interaction;

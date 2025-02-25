/** @format */

import { sequelize, DataTypes } from "./index.js";
// models/customer.js

const Customer = sequelize.define(
  "Customer",
  {
    // Auto-generated ID field
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false, // Automatically generates a unique ID
    },
    // Full name as a combination of first and last names
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // You could also use a getter to combine firstName and lastName, if needed
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validates that it's a valid email format
      },
    },
    phone: {
      type: DataTypes.STRING,
    },
    company: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // References the 'Users' table
        key: "id", // References the 'id' field in the 'Users' table
      },
      onDelete: "CASCADE", // If user is deleted, delete related customers
      onUpdate: "CASCADE",
    },
  },
  {
    // Enable timestamps if you want to track creation and updates
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Customer.associate = (models) => {
  // Customer belongs to User with a foreign key 'userId'
  Customer.belongsTo(models.User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  Customer.hasMany(models.Interaction, {
    foreignKey: "customerId",
    onUpdate: "CASCADE",
  });

  Customer.hasMany(models.Interaction, {
    foreignKey: "customerId",
    onDelete: "CASCADE", // If customer is deleted, delete the related interactions
    onUpdate: "CASCADE", // If customer id is updated, update related interactions
  });
};

Customer.sync()
  .then()
  .catch((err) => console.error("Error creating table:", err));

export default Customer;

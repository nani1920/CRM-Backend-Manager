/** @format */

// Import sequelize instance
import { sequelize, DataTypes } from "./index.js";
import bcrypt from "bcryptjs";

// Define the User model
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto-generated unique ID
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true, // Validates email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user", // Default role is 'user'
      validate: {
        isIn: [["user", "admin"]], // Only allows 'user' or 'admin' values
      },
    },
  },
  {
    // Enable timestamps (createdAt and updatedAt)
    timestamps: true,
    // Optionally customize the names of the timestamp fields
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

User.beforeCreate(async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    user.password = await bcrypt.hash(user.password, salt); // Hash the password
  }
});
User.associate = (models) => {
  // Uncomment this if you want to associate users with customers
  User.hasMany(models.Customer, { foreignKey: "userId", onDelete: "CASCADE" });
};

// Sync the model with the database (create table if it doesn't exist)
User.sync()
  .then()
  .catch((err) => console.error("Error creating table:", err));

// User.hasMany(models.Customer, { foreignKey: "userId" });

export default User;

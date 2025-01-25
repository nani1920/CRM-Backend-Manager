/** @format */

export default {
  development: {
    dialect: "mysql",
    host: "localhost", // MySQL is running on your local machine
    username: "root", // Default username for XAMPP MySQL is 'root'
    password: "", // Default password for XAMPP MySQL is empty (unless you've set one)
    database: "crm_db", // The database you created
    define: {
      timestamps: false, // If you don't want Sequelize to add timestamps
    },
  },
};

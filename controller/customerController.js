/** @format */

import { Op } from "sequelize";
import Customer from "../models/customerModel.js";
import Interaction from "../models/interactionModel.js";

export const getCustomers = async (request, response) => {
  let { name, email, company, phone, page, limit } = request.query;
  page = parseInt(page, 10) || 1; // Default to 1 if invalid
  limit = parseInt(limit, 10) || 10; // Default to 10 if invalid
  const offset = (page - 1) * limit;
  try {
    const requestedQuery = {};
    if (name) {
      requestedQuery.name = { [Op.like]: `%${name}%` };
    }
    if (email) {
      requestedQuery.email = { [Op.like]: `%${email}%` };
    }
    if (phone) {
      requestedQuery.phone = { [Op.like]: `%${phone}%` };
    }
    if (company) {
      requestedQuery.company = { [Op.like]: `%${company}%` };
    }

    const { count, rows } = await Customer.findAndCountAll({
      where: requestedQuery,
      limit: limit,
      offset: offset,
    });

    const totalPages = Math.ceil(count / limit);
    // const customers = await Customer.findAll({ where: requestedQuery });
    if (rows.length === 0) {
      return response.status(404).json({ message: "No customers Found" });
    }
    response.status(200).json({
      customers: rows, // Array of customers (current page)
      totalCustomers: count, // Total number of matching customers
      totalPages: totalPages, // Total number of pages
      currentPage: parseInt(page), // Current page number
    });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export const getCustomer = async (request, response) => {
  const { customerId } = request.params;
  const user = request.user;
  if (!customerId || isNaN(customerId)) {
    return response.status(400).status({ message: "Invalid Customer Id" });
  }
  try {
    const customerExist = await Customer.findOne({ where: { id: customerId } });
    if (!customerExist) {
      return response.status(404).json({ message: "Customer-User not Found" });
    }

    if (customerExist.userId !== user.id && user.role !== "admin") {
      return response
        .status(400)
        .json({ message: "Access Denied- You can only Access your details" });
    }
    const customer = {
      name: customerExist.name,
      email: customerExist.email,
      phone: customerExist.phone,
      company: customerExist.company,
    };

    response.status(200).json(customer);
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export const updateCustomer = async (request, response) => {
  const { customerId } = request.params;
  const { name, phone, company } = request.body;
  const user = request.user;
  try {
    const userExist = await Customer.findOne({
      where: {
        id: customerId,
      },
    });
    if (!userExist) {
      return response.status(404).json({ message: "User Not Found" });
    }
    if (userExist.userId !== user.id && user.role !== "admin") {
      return response
        .status(400)
        .json({ message: "Access Denied- You can only Update your details" });
    }
    if (name) {
      userExist.name = name;
    }
    if (phone) {
      userExist.phone = phone;
    }
    if (company) {
      userExist.company = company;
    }
    await userExist.save();
    response.status(200).json({ message: "User details updated Successfully" });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export const deleteCustomer = async (request, response) => {
  const { customerId } = request.params;
  try {
    if (!customerId || isNaN(customerId)) {
      return response.status(400).json({ message: "Invalid - customerId" });
    }
    const customer = await Customer.findOne({ where: { id: customerId } });
    if (!customer) {
      return response.status(404).json({ message: "Customer not found" });
    }
    await Interaction.destroy({ where: { customerId } });
    await customer.destroy();
    response.status(200).json({ message: "Customer Deleted Successfully" });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

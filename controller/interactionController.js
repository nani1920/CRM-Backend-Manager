/** @format */

// controllers/interactionController.js

import Interaction from "../models/interactionModel.js";
import Customer from "../models/customerModel.js"; // Assuming Customer model is defined

// Create an interaction for a customer
export const createInteraction = async (request, response) => {
  console.log("hello");
  const { customerId } = request.params;
  const { note, followUpDate } = request.body;

  try {
    // Check if the customer exists
    const customerExist = await Customer.findByPk(customerId);
    if (!customerExist) {
      return response.status(404).json({ message: "Customer not found" });
    }

    // Create the interaction for the customer
    const newInteraction = await Interaction.create({
      note,
      followUpDate,
      customerId,
    });

    response.status(201).json({
      message: "Interaction logged successfully",
      interaction: newInteraction,
    });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

// Get all interactions for a specific customer
export const getInteractionById = async (request, response) => {
  const { customerId } = request.params;

  try {
    // Check if the customer exists
    const customerExist = await Customer.findByPk(customerId);
    if (!customerExist) {
      return response.status(404).json({ message: "Customer not found" });
    }

    // Retrieve all interactions for the customer
    const interactions = await Interaction.findAll({
      where: { customerId },
      order: [["created_at", "DESC"]], // Order interactions by most recent
    });

    if (interactions.length === 0) {
      return response
        .status(404)
        .json({ message: "No interactions found for this customer" });
    }

    response.status(200).json({ interactions });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

// Get all interactions
export const getInteractions = async (request, response) => {
  try {
    const interactions = await Interaction.findAll({
      order: [["created_at", "DESC"]],
    });

    if (interactions.length === 0) {
      return response.status(404).json({ message: "No interactions found " });
    }

    response.status(200).json({ interactions });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

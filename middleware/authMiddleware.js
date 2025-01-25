/** @format */

import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const isAdmin = async (request, response, next) => {
  try {
    const authHeader = request.headers["authorization"];
    if (!authHeader) {
      return response
        .status(400)
        .json({ message: "Invalid - Authorization headers Required" });
    }
    const jwtToken = authHeader.split(" ")[1];
    jwt.verify(jwtToken, JWT_SECRET, async (error, payload) => {
      if (error) {
        return response.status(400).json({ message: "Invalid-jwtToken" });
      } else {
        const userId = payload.userId;
        const user = await User.findOne({
          where: {
            id: userId,
          },
        });
        if (!user || user.role !== "admin") {
          return response.status(400).json({ message: "Access Denied" });
        }
        request.user = user;
        next();
      }
    });
  } catch (e) {
    return response
      .status(500)
      .json({ message: `Internal server error ${e.message}` });
  }
};

export const isUser = async (request, response, next) => {
  try {
    const authHeader = request.headers["authorization"];
    if (!authHeader) {
      return response
        .status(400)
        .json({ message: "Invalid-Authorization headers required" });
    }
    const jwtToken = authHeader.split(" ")[1];
    jwt.verify(jwtToken, JWT_SECRET, async (error, payload) => {
      if (error) {
        return response.status(400).json({ message: "Invalid JwtToken" });
      } else {
        const userId = payload.userId;
        const user = await User.findOne({
          where: {
            id: userId,
          },
        });
        if (!user) {
          return response.status(404).json({ message: "User Not Found" });
        }
        request.user = user;
        next();
      }
    });
  } catch (e) {
    return response
      .status(500)
      .json({ message: `Internal server Error: ${e.message}` });
  }
};

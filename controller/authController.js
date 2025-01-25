/** @format */

import express from "express";
import User from "../models/userModel.js";
import Customer from "../models/customerModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const JWT_SECRET = process.env.JWT_SECRET;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const register = async (request, response) => {
  const { username, email, password, role, name, phone, company } =
    request.body;
  try {
    if (!username || username.trim() === "") {
      return response
        .status(400)
        .json({ message: "Invalid - Username field required" });
    }
    if (!email || email.trim() === "") {
      return response
        .status(400)
        .json({ message: "Invalid - Email field required" });
    }
    if (!password || password.trim() === "") {
      return response
        .status(400)
        .json({ message: "Invalid - Password field required" });
    }
    if (!role || role.trim() === "") {
      return response
        .status(400)
        .json({ message: "Invalid - Role field required" });
    }

    //Checking for the invalid fields for user-register
    if (role == "user") {
      if (!name || name.trim() === "") {
        return response
          .status(400)
          .json({ message: "Invalid - Name field required" });
      }
      if (!phone || phone.trim() === "") {
        return response
          .status(400)
          .json({ message: "Invalid - PhoneNo field required" });
      }
      if (!company || company.trim() === "") {
        return response
          .status(400)
          .json({ message: "Invalid - Company field required" });
      }
    }
    const usernameExist = await User.findOne({ where: { username } });
    if (usernameExist) {
      return response.status(400).json({ message: "User already Exists" });
    }
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return response
        .status(400)
        .json({ message: "User already Exists with this Email" });
    }
    if (!emailRegex.test(email)) {
      return response.status(400).json({ message: "Invalid email format" });
    }

    const newUser = await User.create({
      username,
      email,
      password,
      role,
    });
    if (role == "user") {
      const newCustomer = await Customer.create({
        name,
        email,
        phone,
        company,
        userId: newUser.id,
      });
      return response
        .status(201)
        .json({ message: "Customer-user created Successfully" });
    } else {
      return response
        .status(201)
        .json({ message: "Admin-User created Successfully" });
    }
  } catch (e) {
    return response.status(500).json({ message: e.message });
  }
};

export const login = async (request, response) => {
  const { username, password } = request.body;
  try {
    if (!username || username.trim() === "") {
      return response
        .status(400)
        .json({ message: "Invalid - Username field required" });
    }
    if (!password || password.trim() === "") {
      return response
        .status(400)
        .json({ message: "Invalid - Password field required" });
    }
    const userExist = await User.findOne({ where: { username } });
    if (!userExist) {
      return response.status(404).json({ message: "Username Doesn't Exist" });
    }
    const isPasswordMatched = await bcrypt.compare(
      password,
      userExist.password
    );
    if (!isPasswordMatched) {
      return response.status(400).json({ message: "Password Doesn't Matched" });
    }
    const payload = {
      userId: userExist.id,
    };
    const jwtToken = jwt.sign(payload, JWT_SECRET);
    response.status(200).json({ jwtToken });
  } catch (e) {
    return response.status(500).json({ message: e.message });
  }
};

import { RequestHandler } from "express";
import { User } from "../models/user.model";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    return res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json("Error: " + err);
  }
};

export const signInUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordVaild = await bcrypt.compare(password, user.password);
    if (!passwordVaild) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, "secret", {
      expiresIn: "1h",
    });

    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json({
        data: {
          userId: user.id,
          name: user.name,
          email: user.email,
        },
        accessToken: token,
        message: "User logged in successfully",
      });
  } catch (err) {
    return res.status(500).json("Error: " + err);
  }
};

export const logoutUser: RequestHandler = async (req, res) => {
  try {
    res
      .clearCookie("accessToken")
      .status(200)
      .json({ message: "User logged out successfully" });
  } catch (err) {
    return res.status(500).json("Error: " + err);
  }
};

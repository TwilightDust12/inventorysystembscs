import express from "express";
import bcrypt from "bcrypt";
import User from "../models/models.js"; // Import your User model

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" }); // 409 Conflict
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" }); // 400 Bad Request
    }

    // Create new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" }); // 201 Created
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Server error" }); // 500 Internal Server Error
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // If login is successful
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
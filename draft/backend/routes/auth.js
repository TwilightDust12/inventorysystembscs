import express from "express";
import bcrypt from "bcrypt";
import User from "../models/models.js"; // Import your User model

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Username already exists. Please choose another.");
    }
    const hash = await bcrypt.hash(password, 10); // <-- Use await here
    await User.create({ username, password: hash });
    res.redirect("/pages/login.html");
  } catch (err) {
    console.error("Registration error:", err);
    res.status(400).send("Registration failed. Please try again.");
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    res.redirect("/pages/dashboard.html");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

export default router;
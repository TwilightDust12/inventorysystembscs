import express from "express";
import bcrypt from "bcrypt";
import User from "../models/models.js"; // Import your User model

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match.");
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Username already exists.");
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, password: hash });

    // Redirect to the register page with a success query parameter
    res.redirect("/pages/register.html?success=true");
  } catch (err) {
    console.error(err);
    res.status(500).send("Registration failed.");
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
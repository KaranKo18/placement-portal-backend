import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: "No token provided" });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

// GET company profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user.companyProfile || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE company profile
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.companyProfile = req.body;
    await user.save();
    res.json(user.companyProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
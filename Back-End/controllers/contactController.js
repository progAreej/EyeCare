// controllers/contactController.js
const ContactModel = require("../models/contactModel");

const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Create new contact
    const newContact = await ContactModel.create(name, email, message);

    res.status(201).json({
      success: true,
      data: newContact,
    });
  } catch (error) {
    console.error("Error submitting contact message:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

module.exports = { submitContact };

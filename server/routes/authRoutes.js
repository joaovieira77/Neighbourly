const express = require("express");
const { signup, login } = require("../services/authService.js");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const { user, token } = await signup(nome, email, senha, process.env.JWT_SECRET);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const { user, token } = await login(email, senha, process.env.JWT_SECRET);
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

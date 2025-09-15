const express = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const { isAdminAnoAtual } = require("../middleware/isAdminAnoAtual.js");
const { registarDespesa, listarDespesas } = require("../services/despesaService.js");

const router = express.Router();

// Admin: create expense
router.post("/", protect, isAdminAnoAtual, async (req, res) => {
  const id = await registarDespesa({ ...req.body, adminId: req.user._id });
  res.status(201).json({ id });
});

// All users: list expenses (optionally by year)
router.get("/", protect, async (req, res) => {
  const ano = req.query.ano ? parseInt(req.query.ano, 10) : undefined;
  const despesas = await listarDespesas(ano);
  res.json(despesas);
});

module.exports = router;

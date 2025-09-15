const express = require("express");
const { definirAdministradores, obterAdministradores } = require("../services/gestaoAnualService.js");
const { protect } = require("../middleware/authMiddleware.js");
const { isAdminAnoAtual } = require("../middleware/isAdminAnoAtual.js");

const router = express.Router();


router.get("/:ano/admins", protect, async (req, res) => {
  try {
    const ano = parseInt(req.params.ano, 10);
    const result = await obterAdministradores(ano);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Define admins for a given year (must be called by current-year admins)
router.post("/:ano/admins", protect, isAdminAnoAtual, async (req, res) => {
  try {
    const ano = parseInt(req.params.ano, 10);
    const { adminIds } = req.body; // array of 2 userIds
    const result = await definirAdministradores(ano, adminIds);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

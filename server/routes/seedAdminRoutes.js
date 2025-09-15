// routes/seedAdminsRoutes.js
const express = require("express");
const { setAdministradores } = require("../services/gestaoAnualService.js");
const { protect } = require("../middleware/authMiddleware.js");
const { isAdminAnoAtual } = require("../middleware/isAdminAnoAtual.js");

const router = express.Router();

// Define admins para o ano atual (somente admins do ano atual podem fazer)
router.post("/", protect, isAdminAnoAtual, async (req, res) => {
  try {
    const anoAtual = new Date().getFullYear();
    const { adminIds } = req.body;

    if (!Array.isArray(adminIds) || adminIds.length !== 2) {
      return res.status(400).json({ error: "É necessário fornecer exatamente 2 IDs de admins" });
    }

    await setAdministradores(anoAtual, adminIds);
    res.json({ message: `Admins definidos para o ano ${anoAtual}`, adminIds });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

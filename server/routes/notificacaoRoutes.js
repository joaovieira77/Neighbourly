const express = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const { isAdminAnoAtual } = require("../middleware/isAdminAnoAtual.js");
const { criarNotificacao, listarNotificacoes } = require("../services/notificacaoService.js");

const router = express.Router();

// Admin: create notification
router.post("/", protect, isAdminAnoAtual, async (req, res) => {
  const id = await criarNotificacao({ ...req.body, adminId: req.user._id });
  res.status(201).json({ id });
});

// All users: list notifications
router.get("/", protect, async (req, res) => {
  const list = await listarNotificacoes();
  res.json(list);
});

module.exports = router;

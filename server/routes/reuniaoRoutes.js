const express = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const { isAdminAnoAtual } = require("../middleware/isAdminAnoAtual.js");
const {
  criarReuniao,
  listarReunioes,
  registarAta,
  eliminarReuniao,
  editarReuniao,
} = require("../services/reuniaoService.js");

const router = express.Router();

// Admin: schedule meeting
router.post("/", protect, isAdminAnoAtual, async (req, res) => {
  const id = await criarReuniao({ ...req.body, adminId: req.user._id });
  res.status(201).json({ id });
});

// All users: list meetings
router.get("/", protect, async (req, res) => {
  const list = await listarReunioes();
  res.json(list);
});

// Admin: edit meeting
router.patch("/:id", protect, isAdminAnoAtual, async (req, res) => {
  const { dataHora, local, ordemDeTrabalhos } = req.body;
  await editarReuniao(req.params.id, { dataHora, local, ordemDeTrabalhos });
  res.json({ status: "Reunião atualizada" });
});

// DELETE /reunioes/:id
router.delete("/:id", protect, isAdminAnoAtual, async (req, res) => {
  await eliminarReuniao(req.params.id);
  res.json({ status: "Reunião eliminada" });
});

// Admin: add minutes (ata)
router.patch("/:id/ata", protect, isAdminAnoAtual, async (req, res) => {
  await registarAta(req.params.id, req.body.ata, req.user._id);
  res.json({ status: "Ata registada" });
});

module.exports = router;

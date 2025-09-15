const express = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const { isAdminAnoAtual } = require("../middleware/isAdminAnoAtual.js");
const { reportOcorrencia, listarOcorrencias, resolverOcorrencia } = require("../services/ocorrenciaService.js");

const router = express.Router();

// Create occurrence (any logged-in user)
router.post("/", protect, async (req, res) => {
  const id = await reportOcorrencia(req.user._id, req.body.titulo, req.body.descricao);
  res.status(201).json({ id });
});

// List all occurrences
router.get("/", protect, async (req, res) => {
  const list = await listarOcorrencias();
  res.json(list);
});

// Admin resolves occurrence
router.patch("/:id/resolver", protect, isAdminAnoAtual, async (req, res) => {
  await resolverOcorrencia(req.params.id, req.user._id);
  res.json({ status: "Ocorrencia resolved" });
});

module.exports = router;

const express = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const { isAdminAnoAtual } = require("../middleware/isAdminAnoAtual.js");
const {
  atribuirQuota,
  listarQuotasDoUtilizador,
  listarQuotasPorAno,
  atualizarValorQuota,
  marcarQuotaComoPaga,
} = require("../services/quotaService.js");

const router = express.Router();

// User: list own quotas
router.get("/me", protect, async (req, res) => {
  const quotas = await listarQuotasDoUtilizador(req.user._id);
  res.json(quotas);
});

// Admin: assign quota to a user
router.post("/", protect, isAdminAnoAtual, async (req, res) => {
  const { userId, ano, valor } = req.body;
  const id = await atribuirQuota(userId, ano, valor);
  res.status(201).json({ id });
});

// Admin: list quotas for a given year
router.get("/ano/:ano", protect, isAdminAnoAtual, async (req, res) => {
  const quotas = await listarQuotasPorAno(parseInt(req.params.ano, 10));
  res.json(quotas);
});

// Admin: update value of a pending quota
router.patch("/:id/valor", protect, isAdminAnoAtual, async (req, res) => {
  await atualizarValorQuota(req.params.id, req.body.valor);
  res.json({ status: "Quota updated" });
});

// Admin: mark quota as paid
router.patch("/:id/pagar", protect, isAdminAnoAtual, async (req, res) => {
  await marcarQuotaComoPaga(req.params.id, req.user._id);
  res.json({ status: "Quota marked as paid" });
});

module.exports = router;

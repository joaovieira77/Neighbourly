const { verificarSeAdministrador } = require("../services/gestaoAnualService.js");

async function isAdminAnoAtual(req, res, next) {
  const anoAtual = new Date().getFullYear();
  const userId = req.user?._id;
  if (!userId) return res.status(401).json({ error: "Not authorized" });

  const isAdmin = await verificarSeAdministrador(anoAtual, userId);
  if (!isAdmin) return res.status(403).json({ error: "Admins only (current year)" });

  next();
}

module.exports = { isAdminAnoAtual };

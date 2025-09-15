const express = require("express");
const authRoutes = require("./routes/authRoutes.js");
const gestaoAnualRoutes = require("./routes/gestaoAnualRoutes.js");
const quotaRoutes = require("./routes/quotaRoutes.js");
const despesaRoutes = require("./routes/despesaRoutes.js");
const ocorrenciaRoutes = require("./routes/ocorrenciaRoutes.js");
const reuniaoRoutes = require("./routes/reuniaoRoutes.js");
const notificacaoRoutes = require("./routes/notificacaoRoutes.js");
const seedAdminsRoutes = require("./routes/seedAdminRoutes.js");
const cors = require("cors");
const PORT = process.env.PORT || 3037;
require('dotenv').config()

const app = express();

// Middleware para JSON
app.use(express.json());
app.use(cors());


// Health check
app.get("/health", (req, res) => res.json({ ok: true }));

// Rotas
app.use("/auth", authRoutes);
app.use("/gestao", gestaoAnualRoutes);
app.use("/quotas", quotaRoutes);
app.use("/despesas", despesaRoutes);
app.use("/ocorrencias", ocorrenciaRoutes);
app.use("/reunioes", reuniaoRoutes);
app.use("/notificacoes", notificacaoRoutes);
app.use("/seed-admins", seedAdminsRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

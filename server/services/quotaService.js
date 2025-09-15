const quotaData = require("../data/quotaData.js");

async function atribuirQuota(userId, ano, valor) {
  return quotaData.createQuota({ userId, ano, valor });
}

async function listarQuotasDoUtilizador(userId) {
  return quotaData.getQuotasByUser(userId);
}

async function listarQuotasPorAno(ano) {
  return quotaData.getQuotasAllByAno(ano);
}

async function atualizarValorQuota(quotaId, novoValor) {
  return quotaData.updateQuotaValor(quotaId, novoValor);
}

async function marcarQuotaComoPaga(quotaId, adminId) {
  return quotaData.confirmarPagamento(quotaId, adminId);
}

module.exports = { 
  atribuirQuota, 
  listarQuotasDoUtilizador, 
  listarQuotasPorAno, 
  atualizarValorQuota, 
  marcarQuotaComoPaga 
};

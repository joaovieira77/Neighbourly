const ocorrenciaData = require("../data/ocorrenciaData.js");

async function reportOcorrencia(userId, titulo, descricao) {
  return ocorrenciaData.createOcorrencia({ userId, titulo, descricao });
}

async function listarOcorrencias() {
  return ocorrenciaData.getOcorrencias();
}

async function resolverOcorrencia(id, adminId) {
  return ocorrenciaData.updateEstadoOcorrencia(id, "Resolvida", adminId);
}

module.exports = { reportOcorrencia, listarOcorrencias, resolverOcorrencia };

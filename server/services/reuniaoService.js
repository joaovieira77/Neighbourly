const reuniaoData = require("../data/reuniaoData.js");

async function criarReuniao({ dataHora, local, ordemDeTrabalhos, adminId }) {
  return reuniaoData.createReuniao({ dataHora, local, ordemDeTrabalhos, adminId });
}

async function editarReuniao(id, dados) {
  return reuniaoData.updateReuniao(id, dados);
}

async function eliminarReuniao(id) {
  return reuniaoData.deleteReuniao(id);
}   

async function listarReunioes() {
  return reuniaoData.getReunioes();
}

async function registarAta(reuniaoId, ata, adminId) {
  return reuniaoData.addAta(reuniaoId, ata, adminId);
}

module.exports = { criarReuniao, editarReuniao, eliminarReuniao, listarReunioes, registarAta };

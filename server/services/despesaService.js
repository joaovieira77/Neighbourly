const despesaData = require("../data/despesaData.js");

async function registarDespesa({ descricao, valor, data, ano, adminId }) {
  return despesaData.createDespesa({ descricao, valor, data, ano, adminId });
}

async function listarDespesas(ano) {
  return despesaData.getDespesas(ano);
}

module.exports = { registarDespesa, listarDespesas };

const notificacaoData = require("../data/notificacaoData.js");

async function criarNotificacao({ titulo, mensagem, adminId }) {
  return notificacaoData.createNotificacao({ titulo, mensagem, adminId });
}

async function listarNotificacoes() {
  return notificacaoData.getNotificacoes();
}

module.exports = { criarNotificacao, listarNotificacoes };

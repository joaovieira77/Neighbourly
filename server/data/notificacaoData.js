const { GetCollection } = require("./mongodb.js");
const { ObjectId } = require("mongodb");

async function createNotificacao({ titulo, mensagem, adminId }) {
  const notificacoes = await GetCollection("notificacoes");
  const result = await notificacoes.insertOne({
    titulo,
    mensagem,
    data: new Date(),
    criadaPor: new ObjectId(adminId),
  });
  return await result.insertedId;
}

async function getNotificacoes() {
  const notificacoes = await GetCollection("notificacoes");
  return await notificacoes.find().sort({ data: -1 }).toArray();
}

module.exports = {
  createNotificacao,
  getNotificacoes,
};

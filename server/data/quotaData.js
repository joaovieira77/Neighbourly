const { GetCollection } = require("./mongodb.js");
const { ObjectId } = require("mongodb");

async function createQuota({ userId, ano, valor }) {
  const quotas = await GetCollection("quotas");
  const result = await quotas.insertOne({
    userId: new ObjectId(userId),
    ano,
    valor,
    estado: "Pendente",
    dataCriacao: new Date(),
  });
  return await result.insertedId;
}

async function getQuotasByUser(userId) {
  const quotas = await GetCollection("quotas");
  return quotas.find({ userId: new ObjectId(userId) }).toArray();
}

async function getQuotasAllByAno(ano) {
  const quotas = await GetCollection("quotas");
  return await quotas.find({ ano }).toArray();
}

async function updateQuotaValor(quotaId, novoValor) {
  const quotas = await GetCollection("quotas");
  return await quotas.updateOne(
    { _id: new ObjectId(quotaId), estado: "Pendente" },
    { $set: { valor: novoValor } }
  );
}

async function confirmarPagamento(quotaId, adminId) {
  const quotas = await GetCollection("quotas");
  return await quotas.updateOne(
    { _id: new ObjectId(quotaId), estado: "Pendente" },
    {
      $set: {
        estado: "Pago",
        dataPagamento: new Date(),
        confirmadoPor: new ObjectId(adminId),
      },
    }
  );
}

module.exports = {
  createQuota,
  getQuotasByUser,
  getQuotasAllByAno,
  updateQuotaValor,
  confirmarPagamento,
};

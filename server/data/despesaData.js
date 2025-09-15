const { GetCollection } = require("./mongodb.js");
const { ObjectId } = require("mongodb");

async function createDespesa({ descricao, valor, data, ano, adminId }) {
  const despesas = await GetCollection("despesas");
  const result = await despesas.insertOne({
    descricao,
    valor,
    data: data ? new Date(data) : new Date(),
    ano,
    criadoPor: new ObjectId(adminId),
    createdAt: new Date(),
  });
  return await result.insertedId;
}

async function getDespesas(ano) {
  const despesas = await GetCollection("despesas");
  const filter = typeof ano === "number" ? { ano } : {};
  return await despesas.find(filter).toArray();
}

module.exports = { createDespesa, getDespesas };

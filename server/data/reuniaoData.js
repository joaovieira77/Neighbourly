const { GetCollection } = require("./mongodb.js");
const { ObjectId } = require("mongodb");

async function createReuniao({ dataHora, local, ordemDeTrabalhos, adminId }) {
  const reunioes = await GetCollection("reunioes");
  const result = await reunioes.insertOne({
    dataHora: new Date(dataHora),
    local,
    ordemDeTrabalhos: Array.isArray(ordemDeTrabalhos) ? ordemDeTrabalhos : [],
    ata: null,
    criadaPor: new ObjectId(adminId),
    createdAt: new Date(),
  });
  return await result.insertedId;
}

async function updateReuniao(id, dados) {
  const reunioes = await GetCollection("reunioes");
  return await reunioes.updateOne({ _id: new ObjectId(id) }, { $set: dados });
}

async function deleteReuniao(id) {
  const reunioes = await GetCollection("reunioes");
  return await reunioes.deleteOne({ _id: new ObjectId(id) });
}

async function getReunioes() {
  const reunioes = await GetCollection("reunioes");
  return await reunioes.find().sort({ dataHora: -1 }).toArray();
}

async function addAta(reuniaoId, ata, adminId) {
  const reunioes = await GetCollection("reunioes");
  return await reunioes.updateOne(
    { _id: new ObjectId(reuniaoId) },
    { $set: { ata, ataRegistadaPor: new ObjectId(adminId), ataData: new Date() } }
  );
}

module.exports = {
  createReuniao,
  updateReuniao,
  deleteReuniao,
  getReunioes,
  addAta,
};

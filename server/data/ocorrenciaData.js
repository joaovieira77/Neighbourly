const { GetCollection } = require("./mongodb.js");
const { ObjectId } = require("mongodb");

async function createOcorrencia({ userId, titulo, descricao }) {
  const ocorrencias = await GetCollection("ocorrencias");
  const result = await ocorrencias.insertOne({
    userId: new ObjectId(userId),
    titulo,
    descricao,
    estado: "Pendente",
    dataCriacao: new Date(),
  });
  return await result.insertedId;
}

async function getOcorrencias() {
  const ocorrencias = await GetCollection("ocorrencias");
  return await ocorrencias.find().sort({ dataCriacao: -1 }).toArray();
}

async function updateEstadoOcorrencia(id, novoEstado, adminId) {
  const ocorrencias = await GetCollection("ocorrencias");
  return await ocorrencias.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        estado: novoEstado,
        resolvidoPor: new ObjectId(adminId),
        dataResolucao: new Date(),
      },
    }
  );
}

module.exports = {
  createOcorrencia,
  getOcorrencias,
  updateEstadoOcorrencia,
};

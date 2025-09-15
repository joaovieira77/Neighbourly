const { GetCollection } = require("./mongodb.js");
const { ObjectId } = require("mongodb");

async function setAdministradores(ano, adminIds) {
  const gestaoAnual = await GetCollection("gestaoAnual");
  const adminsObjectIds = adminIds.map((id) => new ObjectId(id));

  return await gestaoAnual.updateOne(
    { ano },
    {
      $set: { admins: adminsObjectIds, updatedAt: new Date() },
      $setOnInsert: { createdAt: new Date() }
    },
    { upsert: true }
  );
}

async function getAdministradores(ano) {
  const gestaoAnual = await GetCollection("gestaoAnual");
  return await gestaoAnual.findOne({ ano });
}

module.exports = { setAdministradores, getAdministradores };

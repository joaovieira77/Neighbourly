const { setAdministradores, getAdministradores } = require("../data/gestaoAnualData.js");

async function definirAdministradores(ano, adminIds) {
  if (!Array.isArray(adminIds) || adminIds.length !== 2) throw new Error("Provide exactly 2 administrator user IDs");
  await setAdministradores(ano, adminIds);
  return { ano, admins: adminIds };
}

async function obterAdministradores(ano) {
  const gestao = await getAdministradores(ano);
  return { ano, admins: gestao?.admins || [] };
}

async function verificarSeAdministrador(ano, userId) {
  const gestao = await getAdministradores(ano);
  if (!gestao || !Array.isArray(gestao.admins)) return false;
  return gestao.admins.some((id) => id.toString() === userId.toString());
}

module.exports = { definirAdministradores, obterAdministradores, verificarSeAdministrador };

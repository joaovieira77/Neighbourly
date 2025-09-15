const { GetCollection } = require("./mongodb.js");
const { ObjectId } = require("mongodb");

async function findUserByEmail(email) {
  const users = await GetCollection("users");
  return await users.findOne({ email });
}

async function createUser(userData) {
  const users = await GetCollection("users");
  const result = await users.insertOne(userData);
  return { ...userData, _id: result.insertedId };
}

async function findUserById(id) {
  const users = await GetCollection("users");
  const _id = typeof id === "string" ? new ObjectId(id) : id;
  return await users.findOne({ _id });
}

module.exports = { findUserByEmail, createUser, findUserById };

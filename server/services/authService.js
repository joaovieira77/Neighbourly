const bcrypt = require("bcryptjs");
const { findUserByEmail, createUser } = require("../data/userData.js");
const { generateToken } = require("../utils/generateToken.js");

async function signup(nome, email, senha) {
  const existing = await findUserByEmail(email);
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(senha, 10);
  const user = await createUser({
    nome,
    email,
    senha: hashed,
    role: "condomino",
    ativo: true,
    createdAt: new Date()
  });

  const token = generateToken(user._id, process.env.JWT_SECRET);
  return { user, token };
}

async function login(email, senha) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const ok = await bcrypt.compare(senha, user.senha);
  if (!ok) throw new Error("Invalid credentials");

  const token = generateToken(user._id, process.env.JWT_SECRET);
  return { user, token };
}

module.exports = { signup, login };

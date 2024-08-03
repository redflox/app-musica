const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const register = async (req, res) => {
  // Register user
  const { name, email, password } = req.body;
  let hash;
  try {
    hash = await bcrypt.hash(password, 10);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error hashing password", error: error });
  }
  try {
    const user = await User.create({ name, email, password: hash });
    return res.status(201).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating user", error: error });
  }
};

const login = async (req, res) => {
  // Login user
  const { email, password } = req.body;
  let user = null;
  try {
    user = await User.findOne({ where: { email } });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error user or password not found!" });
  }
  if (!user) {
    return res
      .status(404)
      .json({ message: "Error user or password not found!" });
  }
  let valid;
  try {
    valid = await bcrypt.compare(password, user.password);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error user or password not found!" });
  }
  if (!valid) {
    return res
      .status(404)
      .json({ message: "Error user or password not found!" });
  }

  //CRENADO EL JWT SI EL USUARIO EXISTE
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(200).json({ token });
};

module.exports = { register, login };

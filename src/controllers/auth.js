const { getExist, createUser } = require("../services/auth");
const {
  isPasswordCorrect,
} = require("../utils/password/checkPasswordValidation");
const { hashGenerator } = require("../utils/password/hashGenerator");

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const data = await getExist(email);

    if (data) return res.status(409).json({ message: "User already exists!" });

    const hashPassword = await hashGenerator(password);
    await createUser({ email, password: hashPassword, username });

    return res.status(200).json({ message: "User created successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const data = await getExist(req.body.email);

    if (!data.length) {
      return res.status(401).json({ message: "Wrong Email or Password!" });
    }

    const isValidPassword = await isPasswordCorrect(
      data[0].password,
      req.body.password
    );

    if (!isValidPassword) {
      return res.status(401).json({ message: "Wrong Email or Password!" });
    }

    return res.status(200).json({ message: "login successful!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = { register, login, logout };

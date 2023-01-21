const { getExist, createUser, isAdminExist } = require("../services/user");
const { tokenGenerator } = require("../utils/auth/tokenGenerator");
const {
  isPasswordCorrect,
} = require("../utils/password/checkPasswordValidation");
const { hashGenerator } = require("../utils/password/hashGenerator");

const register = async (req, res) => {
  try {
    const { email, password, username, img } = req.body;

    const data = await getExist(email);

    if (data.length)
      return res.status(409).json({ message: "User already exists!" });

    const hashPassword = await hashGenerator(password);

    const newUserInfo = {
      email,
      password: hashPassword,
      username,
      img,
    };
    await createUser(newUserInfo);

    const userInfo = await getExist(email);
    const { password: p, ...otherInfo } = userInfo[0];
    const token = tokenGenerator({ ...otherInfo, isAdmin: false });

    return res
      .status(200)
      .json({ message: "User created successfully!", token, user: otherInfo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const data = await getExist(req.body.email);
    const admin = await isAdminExist(req.body.email);

    if (admin.length) {
      await userLogin({ ...admin[0], isAdmin: true }, req, res);
    } else if (data.length) {
      await userLogin({ ...data[0], isAdmin: false }, req, res);
    } else {
      return res.status(401).json({ message: "Wrong Email or Password!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const userLogin = async (data, req, res) => {
  const isValidPassword = await isPasswordCorrect(
    data.password,
    req.body.password
  );

  if (!isValidPassword) {
    return res.status(401).json({ message: "Wrong Email or Password!" });
  }

  const { password, ...otherInfo } = data;
  const token = tokenGenerator({
    ...otherInfo,
    isAdmin: data.isAdmin,
  });

  return res
    .status(200)
    .json({ message: "login successful!", token, user: otherInfo });
};

module.exports = { register, login };

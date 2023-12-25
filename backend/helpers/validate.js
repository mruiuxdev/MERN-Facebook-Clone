const User = require("../models/users.model");

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

const validateLength = (text, min, max) => {
  if (text.length > max || text.length < min) {
    return false;
  }

  return true;
};

const generateRandomString = (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);

    randomString += characters.charAt(randomIndex);
  }
  return randomString;
};

const validateUsername = async (username) => {
  let isUnique = false;

  do {
    let check = await User.findOne({ username });

    if (check) {
      const randomSuffix = generateRandomString(4);

      username = username + randomSuffix;
    } else {
      isUnique = true;
    }
  } while (!isUnique);

  return username;
};

module.exports = { validateEmail, validateLength, validateUsername };

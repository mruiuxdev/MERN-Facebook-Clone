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

const generateUniqueUsername = async (firstName, lastName) => {
  let userName = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;

  let isUnique = false;

  do {
    const check = await User.findOne({ userName });

    if (check) {
      const randomSuffix = generateRandomString(4);

      userName = `${firstName.toLowerCase()}${lastName.toLowerCase()}${randomSuffix}`;
    } else {
      isUnique = true;
    }
  } while (!isUnique);

  return userName.toLowerCase();
};

module.exports = { validateEmail, validateLength, generateUniqueUsername };

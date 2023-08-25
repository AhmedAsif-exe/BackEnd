const { hash } = require("bcryptjs");

const { NotFoundError } = require("../util/errors");
const { readData, writeData } = require("./util");
const { use } = require("../routes/auth");

async function add(data) {
  const hashedPw = await hash(data.password, 12);
  await writeData({ ...data, password: hashedPw });
  return { email: data.email };
}

async function get(email) {
  const storedData = await readData();
  try {
    if (!storedData) {
      throw new NotFoundError("Could not find any users.");
    }
  } catch (e) {
    return null;
  }
  try {
    const user = storedData.find((ev) => ev.email === email);
    if (!user) {
      throw new NotFoundError("Could not find user for email " + email);
    }
    return user;
  } catch (e) {
    return null;
  }
}

exports.add = add;
exports.get = get;

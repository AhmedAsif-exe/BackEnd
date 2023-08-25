const { json } = require("body-parser");
if (process.env.NODE_ENV !== "production") require("dotenv").config();

async function readData() {
  const response = await fetch(process.env.DBAPI);
  const data = await response.json();
  const entry = [];
  for (const key in data) {
    entry.push({
      email: data[key].email,
      password: data[key].password,
    });
  }
  return entry;
}

async function writeData(data) {
  const response = await fetch(process.env.DBAPI, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

exports.readData = readData;
exports.writeData = writeData;

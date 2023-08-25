const { json } = require("body-parser");
const url =
  "https://logindatabase-d00f3-default-rtdb.asia-southeast1.firebasedatabase.app/user-enteries.json";

async function readData() {
  const response = await fetch(url);
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
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

exports.readData = readData;
exports.writeData = writeData;

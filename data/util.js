const { json } = require("body-parser");
const { JsonWebTokenError } = require("jsonwebtoken");
const url =
  "https://logindatabase-d00f3-default-rtdb.asia-southeast1.firebasedatabase.app/";

async function readData() {
  const response = await fetch(url + "user-enteries.json");
  const data = await response.json();
  const entry = [];
  for (const key in data) {
    entry.push({
      id: key,
      email: data[key].email,
      password: data[key].password,
    });
  }
  return entry;
}

async function writeData(data) {
  const response = await fetch(url + "user-enteries.json", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function readOrders() {
  const response = await fetch(url + "order-history.json");
  const data = await response.json();
  const entry = [];
  for (const key in data) {
    entry.push({
      id: data[key].userId,
      time: data[key].time,
      date: data[key].date,
      summary: data[key].summary,
      total: data[key].total,
    });
  }
  return entry;
}

async function writeOrders(id, order) {
  const orderobj = { userId: id, ...order };
  const response = await fetch(url + "order-history.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderobj),
  });
}
exports.readData = readData;
exports.writeData = writeData;
exports.readOrders = readOrders;
exports.writeOrders = writeOrders;

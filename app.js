const bodyParser = require("body-parser");
const express = require("express");
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const app = express();
const { checkAuthMiddleware } = require("./util/auth");
const allowedOrigins = [`https://manga-quest.web.app`];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(authRoutes);

app.use(checkAuthMiddleware);
app.use(orderRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

app.listen(PORT);

import express from "express";
import connectDb from "./db/db.js";
import { config } from "./config/config.js";
import router from "./api/api.js";
import errorHandler from "./middleware/error-handler.js";

const app = express();
const port = config.server.port;
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const startServer = () => {
  app.use("/", router);
  app.use(errorHandler);
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
};
const server = async () => {
  connectDb()
    .then((res) => {
      console.log(res.message);
      startServer();
    })
    .catch((err) => {
      console.log(err.message);
    });
};
server();
// startServer();

import express from "express";
import cors from "cors";
import config from "./config";
import router from "./router";
import errorHandler from "./middleware/errorHandler";
const app = express();
const cookieParser = require("cookie-parser");
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(errorHandler);
app.listen(config.port, () => {
  console.log(`Listening on port ${config.port} `);
});

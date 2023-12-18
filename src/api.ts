import { apiRouter } from "./MVC/routers/api-router";
const express = require("express");
const cors = require("cors");

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter)
import { Request, Response, NextFunction } from "express";
import { apiRouter } from "./MVC/routers/api-router";
const { handleCustomErrors, handlePSQLErrors } = require("./errors");
const express = require("express");
const cors = require("cors");

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter)

app.all("/*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ msg: "URL not found" });
  });
  
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
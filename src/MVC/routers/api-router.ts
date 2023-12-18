import { teachersRouter } from "./teachers-router";
export const apiRouter = require("express").Router();

apiRouter.use("/teachers", teachersRouter);
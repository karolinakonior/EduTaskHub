import { teachersRouter } from "./teachers-router";
import { studentsRouter } from "./students-router";
export const apiRouter = require("express").Router();

apiRouter.use("/teachers", teachersRouter);
apiRouter.use("/students", studentsRouter);
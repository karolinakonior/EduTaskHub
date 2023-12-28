import { teachersRouter } from "./teachers-router";
import { studentsRouter } from "./students-router";
import { subjectsRouter } from "./subjects-router";
import { yearsRouter } from "./years-router";
export const apiRouter = require("express").Router();

apiRouter.use("/teachers", teachersRouter);
apiRouter.use("/students", studentsRouter);
apiRouter.use("/subjects", subjectsRouter);
apiRouter.use("/years", yearsRouter)
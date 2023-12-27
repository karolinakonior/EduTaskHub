export const subjectsRouter = require("express").Router();
const { getSubjects } = require("../controllers/SubjectsController") 

subjectsRouter.route("/").get(getSubjects)
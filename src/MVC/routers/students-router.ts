export const studentsRouter = require("express").Router();
const { getStudents } = require("../controllers/StudensController")

studentsRouter.route("/").get(getStudents)
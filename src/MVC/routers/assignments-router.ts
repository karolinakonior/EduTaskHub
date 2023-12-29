export const assignmentsRouter = require("express").Router();
const { getAssignments } = require("../controllers/AssignmentsController")

assignmentsRouter.route("/").get(getAssignments)
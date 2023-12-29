export const assignmentsRouter = require("express").Router();
const { getAssignments, postAssignment, getAssignmentById } = require("../controllers/AssignmentsController")

assignmentsRouter.route("/").get(getAssignments).post(postAssignment)
assignmentsRouter.route("/:assignment_id").get(getAssignmentById)
export const assignmentsRouter = require("express").Router();
const { getAssignments, postAssignment, getAssignmentById, patchAssignmentById, deleteAssignmentById } = require("../controllers/AssignmentsController")

assignmentsRouter.route("/").get(getAssignments).post(postAssignment)
assignmentsRouter.route("/:assignment_id").get(getAssignmentById).patch(patchAssignmentById).delete(deleteAssignmentById)
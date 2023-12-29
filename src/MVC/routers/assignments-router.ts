export const assignmentsRouter = require("express").Router();
const { getAssignments, postAssignment } = require("../controllers/AssignmentsController")

assignmentsRouter.route("/").get(getAssignments).post(postAssignment)
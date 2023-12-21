export const studentsRouter = require("express").Router();
const { getStudents, getStudentById, postStudent, patchStudentById } = require("../controllers/StudensController")

studentsRouter.route("/").get(getStudents).post(postStudent)
studentsRouter.route("/:student_id").get(getStudentById).patch(patchStudentById)
export const studentsRouter = require("express").Router();
const { getStudents, getStudentById, postStudent, patchStudentById, deleteStudentById, getStudentSubjects } = require("../controllers/StudensController")

studentsRouter.route("/").get(getStudents).post(postStudent)
studentsRouter.route("/:student_id").get(getStudentById).patch(patchStudentById).delete(deleteStudentById)
studentsRouter.route("/:student_id/subjects").get(getStudentSubjects)
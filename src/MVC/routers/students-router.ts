export const studentsRouter = require("express").Router();
const { getStudents, getStudentById, postStudent, patchStudentById, deleteStudentById, getStudentSubjects, postStudentSubjects, deleteStudentSubjectById, getStudentYear, postStudentYear, deleteStudentYearById, getStudentAssignments } = require("../controllers/StudensController")

studentsRouter.route("/").get(getStudents).post(postStudent)
studentsRouter.route("/:student_id").get(getStudentById).patch(patchStudentById).delete(deleteStudentById)
studentsRouter.route("/:student_id/subjects").get(getStudentSubjects).post(postStudentSubjects)
studentsRouter.route("/:student_id/subjects/:subject_id").delete(deleteStudentSubjectById)
studentsRouter.route("/:student_id/year").get(getStudentYear).post(postStudentYear)
studentsRouter.route("/:student_id/year/:year_id").delete(deleteStudentYearById)
studentsRouter.route("/:student_id/assignments").get(getStudentAssignments)
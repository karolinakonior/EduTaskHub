export const teachersRouter = require("express").Router();
const { getTeachers, getTeacherById, patchTeacherById, postTeacher, deleteTeacherById, getTeachersSubject, postTeachersSubject, deleteTeachersSubject } = require("../controllers/TeachersController");

teachersRouter.route("/").get(getTeachers).post(postTeacher);
teachersRouter.route("/:teacher_id").get(getTeacherById).patch(patchTeacherById).delete(deleteTeacherById);
teachersRouter.route("/:teacher_id/subjects").get(getTeachersSubject).post(postTeachersSubject)
teachersRouter.route("/:teacher_id/subjects/:subject_id").delete(deleteTeachersSubject);
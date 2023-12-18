export const teachersRouter = require("express").Router();
const { getTeachers, getTeacherById, patchTeacherById, postTeacher } = require("../controllers/TeachersController");

teachersRouter.route("/").get(getTeachers).post(postTeacher);
teachersRouter.route("/:teacher_id").get(getTeacherById).patch(patchTeacherById);
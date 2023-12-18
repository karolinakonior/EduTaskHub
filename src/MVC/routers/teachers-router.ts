export const teachersRouter = require("express").Router();
const { getTeachers, getTeacherById, patchTeacherById } = require("../controllers/TeachersController");

teachersRouter.route("/").get(getTeachers);
teachersRouter.route("/:teacher_id").get(getTeacherById).patch(patchTeacherById);
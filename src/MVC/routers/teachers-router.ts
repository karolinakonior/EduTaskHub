export const teachersRouter = require("express").Router();
const { getTeachers, getTeacherById } = require("../controllers/TeachersController");

teachersRouter.route("/").get(getTeachers);
teachersRouter.route("/:teacher_id").get(getTeacherById);
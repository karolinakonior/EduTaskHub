export const teachersRouter = require("express").Router();
const { getTeachers } = require("../controllers/TeachersController");

teachersRouter.route("/").get(getTeachers);
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teachersRouter = void 0;
exports.teachersRouter = require("express").Router();
const { getTeachers, getTeacherById, patchTeacherById, postTeacher } = require("../controllers/TeachersController");
exports.teachersRouter.route("/").get(getTeachers).post(postTeacher);
exports.teachersRouter.route("/:teacher_id").get(getTeacherById).patch(patchTeacherById);

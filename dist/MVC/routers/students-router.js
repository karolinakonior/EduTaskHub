"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsRouter = void 0;
exports.studentsRouter = require("express").Router();
const { getStudents, getStudentById, postStudent } = require("../controllers/StudensController");
exports.studentsRouter.route("/").get(getStudents).post(postStudent);
exports.studentsRouter.route("/:student_id").get(getStudentById);

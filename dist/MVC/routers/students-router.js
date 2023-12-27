"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsRouter = void 0;
exports.studentsRouter = require("express").Router();
const { getStudents, getStudentById, postStudent, patchStudentById, deleteStudentById, getStudentSubjects, postStudentSubjects, deleteStudentSubjectById } = require("../controllers/StudensController");
exports.studentsRouter.route("/").get(getStudents).post(postStudent);
exports.studentsRouter.route("/:student_id").get(getStudentById).patch(patchStudentById).delete(deleteStudentById);
exports.studentsRouter.route("/:student_id/subjects").get(getStudentSubjects).post(postStudentSubjects);
exports.studentsRouter.route("/:student_id/subjects/:subject_id").delete(deleteStudentSubjectById);

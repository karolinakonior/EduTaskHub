"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsRouter = void 0;
exports.studentsRouter = require("express").Router();
const { getStudents } = require("../controllers/StudensController");
exports.studentsRouter.route("/").get(getStudents);

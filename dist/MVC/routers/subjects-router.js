"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectsRouter = void 0;
exports.subjectsRouter = require("express").Router();
const { getSubjects } = require("../controllers/SubjectsController");
exports.subjectsRouter.route("/").get(getSubjects);

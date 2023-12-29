"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentsRouter = void 0;
exports.assignmentsRouter = require("express").Router();
const { getAssignments, postAssignment, getAssignmentById } = require("../controllers/AssignmentsController");
exports.assignmentsRouter.route("/").get(getAssignments).post(postAssignment);
exports.assignmentsRouter.route("/:assignment_id").get(getAssignmentById);

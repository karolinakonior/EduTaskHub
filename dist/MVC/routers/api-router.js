"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const teachers_router_1 = require("./teachers-router");
exports.apiRouter = require("express").Router();
exports.apiRouter.use("/teachers", teachers_router_1.teachersRouter);

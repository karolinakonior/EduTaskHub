"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yearsRouter = void 0;
exports.yearsRouter = require("express").Router();
const { getYears } = require("../controllers/YearsController");
exports.yearsRouter.route("/").get(getYears);

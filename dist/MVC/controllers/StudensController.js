"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { fetchStudents } = require("../models/StudentsModel");
exports.getStudents = (req, res, next) => {
    fetchStudents()
        .then((students) => {
        res.status(200).send({ students });
    });
};

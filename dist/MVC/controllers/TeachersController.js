"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { fetchTeachers, fetchTeacherById } = require("../models/TeachersModel");
exports.getTeachers = (req, res, next) => {
    fetchTeachers()
        .then((teachers) => {
        res.status(200).send({ teachers });
    });
};
exports.getTeacherById = (req, res, next) => {
    const { teacher_id } = req.params;
    fetchTeacherById(teacher_id)
        .then((teacher) => {
        res.status(200).send({ teacher });
    })
        .catch((err) => {
        next(err);
    });
};

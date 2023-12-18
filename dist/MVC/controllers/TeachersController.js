"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { fetchTeachers } = require("../models/TeachersModel");
exports.getTeachers = (req, res, next) => {
    fetchTeachers()
        .then((teachers) => {
        res.status(200).send({ teachers });
    });
};

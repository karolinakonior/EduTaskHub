"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { fetchSubjects } = require("../models/SubjectsModel");
exports.getSubjects = (req, res, next) => {
    fetchSubjects()
        .then((subjects) => {
        return res.status(200).send({ subjects });
    });
};

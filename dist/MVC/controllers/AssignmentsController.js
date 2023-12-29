"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { fetchAssignments } = require("../models/AssignmentsModel");
exports.getAssignments = (req, res, next) => {
    fetchAssignments()
        .then((assignments) => {
        res.status(200).send({ assignments });
    });
};

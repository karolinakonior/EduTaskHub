"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { fetchAssignments, postSingleAssignment, fetchAssignmentById } = require("../models/AssignmentsModel");
exports.getAssignments = (req, res, next) => {
    fetchAssignments()
        .then((assignments) => {
        res.status(200).send({ assignments });
    })
        .catch((err) => {
        next(err);
    });
};
exports.postAssignment = (req, res, next) => {
    postSingleAssignment(req.body)
        .then((assignment) => {
        res.status(201).send({ assignment });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getAssignmentById = (req, res, next) => {
    fetchAssignmentById(req.params.assignment_id)
        .then((assignment) => {
        res.status(200).send({ assignment });
    })
        .catch((err) => {
        next(err);
    });
};

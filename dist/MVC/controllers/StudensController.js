"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { fetchStudents, fetchStudentById, postSingleUser } = require("../models/StudentsModel");
exports.getStudents = (req, res, next) => {
    fetchStudents()
        .then((students) => {
        res.status(200).send({ students });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getStudentById = (req, res, next) => {
    fetchStudentById(req.params.student_id)
        .then((student) => {
        res.status(200).send({ student });
    })
        .catch((err) => {
        next(err);
    });
};
exports.postStudent = (req, res, next) => {
    fetchStudents()
        .then((students) => {
        let doesEmailExist = false;
        students.forEach((student) => {
            if (student.email === req.body.email)
                doesEmailExist = true;
        });
        if (doesEmailExist)
            return Promise.reject({ status: 400, msg: "Email already exists" });
    })
        .then(() => {
        return postSingleUser(req.body);
    })
        .then((student) => {
        res.status(201).send({ student });
    })
        .catch((err) => {
        next(err);
    });
};

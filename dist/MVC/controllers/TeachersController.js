"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { fetchTeachers, fetchTeacherById, patchTeacher, postNewTeacher, deleteTeacher, fetchTeachersSubject, postNewTeachersSubject, deleteSingleTeachersSubject } = require("../models/TeachersModel");
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
exports.patchTeacherById = (req, res, next) => {
    const { teacher_id } = req.params;
    patchTeacher(teacher_id, req.body)
        .then((teacher) => {
        res.status(200).send({ teacher });
    })
        .catch((err) => {
        next(err);
    });
};
exports.postTeacher = (req, res, next) => {
    postNewTeacher(req.body)
        .then((teacher) => {
        res.status(201).send({ teacher });
    })
        .catch((err) => {
        next(err);
    });
};
exports.deleteTeacherById = (req, res, next) => {
    const { teacher_id } = req.params;
    return fetchTeacherById(teacher_id)
        .then(() => {
        deleteTeacher(teacher_id);
    })
        .then(() => {
        res.sendStatus(204);
    })
        .catch((err) => {
        next(err);
    });
};
exports.getTeachersSubject = (req, res, next) => {
    const { teacher_id } = req.params;
    fetchTeacherById(teacher_id)
        .then(() => {
        return fetchTeachersSubject(teacher_id);
    })
        .then((subject) => {
        res.status(200).send(subject);
    })
        .catch((err) => {
        next(err);
    });
};
exports.postTeachersSubject = (req, res, next) => {
    const subject_name = req.body.subject_name;
    fetchTeacherById(req.params.teacher_id)
        .then(() => {
        return postNewTeachersSubject(req.params.teacher_id, subject_name);
    })
        .then((subject) => {
        res.status(201).send(subject);
    })
        .catch((err) => {
        next(err);
    });
};
exports.deleteTeachersSubject = (req, res, next) => {
    fetchTeacherById(req.params.teacher_id)
        .then(() => {
        return deleteSingleTeachersSubject(req.params.teacher_id, req.params.subject_id);
    })
        .then(() => {
        res.sendStatus(204);
    })
        .catch((err) => {
        next(err);
    });
};

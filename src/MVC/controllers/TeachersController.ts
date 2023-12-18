import { Request, Response, NextFunction } from "express";
import { Teacher } from "../../db/data/test-data/teachers";
const { fetchTeachers, fetchTeacherById, patchTeacher } = require("../models/TeachersModel");


exports.getTeachers = (req: Request, res: Response, next: NextFunction) => {
    fetchTeachers()
    .then((teachers: Teacher) => {
        res.status(200).send({ teachers })
    })
}

exports.getTeacherById = (req: Request, res: Response, next: NextFunction) => {
    const { teacher_id } = req.params;
    fetchTeacherById(teacher_id)
    .then((teacher: Teacher) => {
        res.status(200).send({ teacher })
    })
    .catch((err: Error) => {
        next(err);
    })
}

exports.patchTeacherById = (req: Request, res: Response, next: NextFunction) => {
    const { teacher_id } = req.params;
    patchTeacher(teacher_id, req.body)
    .then((teacher: Teacher) => {
        res.status(200).send({ teacher })
    })
    .catch((err: Error) => {
        next(err);
    })
}
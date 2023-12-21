import { Request, Response, NextFunction } from "express";
import { Teacher } from "../../db/data/test-data/teachers";
const { fetchTeachers, fetchTeacherById, patchTeacher, postNewTeacher, deleteTeacher, fetchTeachersSubject } = require("../models/TeachersModel");

type SubjectProps = {
    subject: string,
    teacher_id: number,
    subject_id: number
}

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

exports.postTeacher = (req: Request, res: Response, next: NextFunction) => {
    postNewTeacher(req.body)
    .then((teacher: Teacher) => {
        res.status(201).send({ teacher })
    })
    .catch((err: Error) => {
        next(err);
    })
}

exports.deleteTeacherById = (req: Request, res: Response, next: NextFunction) => {
    const { teacher_id } = req.params;
    return fetchTeacherById(teacher_id)
    .then(() => {
        deleteTeacher(teacher_id)
    })
    .then(() => {
        res.sendStatus(204);
    })
    .catch((err: Error) => {
        next(err);
    })
}

exports.getTeachersSubject = (req: Request, res: Response, next: NextFunction) => {
    const { teacher_id } = req.params;
    fetchTeacherById(teacher_id)
    .then(() => {
        return fetchTeachersSubject(teacher_id)
    })
    .then((subject: SubjectProps) => {
        res.status(200).send(subject)
    })
    .catch((err: Error) => {
        next(err);
    })
}
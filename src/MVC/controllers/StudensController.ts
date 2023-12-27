import { Request, Response, NextFunction } from "express";
const { fetchStudents, fetchStudentById, postSingleUser, patchStudent, deleteStudent, fetchStudentSubjects, postNewStudentSubject } = require("../models/StudentsModel");
import { Student } from "../../db/data/test-data/students";
import { Subject } from "../../db/data/test-data/subjects";

exports.getStudents = (req: Request, res: Response, next: NextFunction) => {
    fetchStudents()
    .then((students: Student[]) => {
        res.status(200).send({ students });
    })
    .catch((err: Error) => {
        next(err);
    })
}

exports.getStudentById = (req: Request, res: Response, next: NextFunction) => {
    fetchStudentById(req.params.student_id)
    .then((student: Student) => {
        res.status(200).send({ student });
    })
    .catch((err: Error) => {
        next(err);
    })
}

exports.postStudent = (req: Request, res: Response, next: NextFunction) => {
    fetchStudents()
    .then((students: Student[]) => {
        let doesEmailExist = false;
        students.forEach((student: Student) => {
            if(student.email === req.body.email) doesEmailExist = true;
        })
        if(doesEmailExist) return Promise.reject({ status: 400, msg: "Email already exists" })
    })
    .then(() => {
        return postSingleUser(req.body)
    })
    .then((student: Student) => {
        res.status(201).send({ student });
    })
    .catch((err: Error) => {
        next(err);
    })
}

exports.patchStudentById = (req: Request, res: Response, next: NextFunction) => {
    fetchStudentById(req.params.student_id)
    .then(() => {
        return patchStudent(req.params.student_id, req.body)
    })
    .then((student: Student) => {
        res.status(200).send({ student });
    })
    .catch((err: Error) => {
        next(err);
    })
}

exports.deleteStudentById = (req: Request, res: Response, next: NextFunction) => {
    fetchStudentById(req.params.student_id)
    .then(() => {
        deleteStudent(req.params.student_id)
    })
    .then(() => {
        res.sendStatus(204);
    })
    .catch((err: Error) => {
        next(err);
    })
}

exports.getStudentSubjects = (req: Request, res: Response, next: NextFunction) => {
    return fetchStudentById(req.params.student_id)
    .then(() => {
        return fetchStudentSubjects(req.params.student_id)
    })
    .then((subjects: Subject[]) => {
        res.status(200).send({ subjects });
    })
    .catch((err: Error) => {
        next(err);
    })
}

exports.postStudentSubjects = (req: Request, res: Response, next: NextFunction) => {
    fetchStudentById(req.params.student_id)
    .then(() => {
        return postNewStudentSubject(req.params.student_id, req.body.subject_name)
    })
    .then((subject: Subject) => {
        res.status(201).send({ subject });
    })
    .catch((err: Error) => {  
        next(err);
    })
}
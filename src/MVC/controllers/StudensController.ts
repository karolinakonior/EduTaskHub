import { Request, Response, NextFunction } from "express";
const { fetchStudents } = require("../models/StudentsModel");
import { Student } from "../../db/data/test-data/students";

exports.getStudents = (req: Request, res: Response, next: NextFunction) => {
    fetchStudents()
    .then((students: Student[]) => {
        res.status(200).send({ students });
    })
}
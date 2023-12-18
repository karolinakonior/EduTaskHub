import { Request, Response, NextFunction } from "express";
import { Teacher } from "../../db/data/test-data/teachers";
const { fetchTeachers } = require("../models/TeachersModel");


exports.getTeachers = (req: Request, res: Response, next: NextFunction) => {
    fetchTeachers()
    .then((teachers: Teacher) => {
        res.status(200).send({ teachers })
    })
}
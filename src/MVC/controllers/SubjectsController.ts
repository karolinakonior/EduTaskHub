import { Request, Response, NextFunction } from "express";
import { Subject } from "../../types/Subject";
const { fetchSubjects } = require("../models/SubjectsModel")

exports.getSubjects = (req: Request, res: Response, next: NextFunction) => {
    fetchSubjects()
    .then((subjects: Subject) => {
        return res.status(200).send({subjects})
    })
}
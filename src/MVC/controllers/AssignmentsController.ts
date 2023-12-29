import { Request, Response, NextFunction } from "express";
const { fetchAssignments } = require("../models/AssignmentsModel")
import { Assignment } from "../../db/data/test-data/assignments"

exports.getAssignments = (req: Request, res: Response, next: NextFunction) => {
    fetchAssignments()
    .then((assignments: Assignment[]) => {
        res.status(200).send({ assignments })
    })
}
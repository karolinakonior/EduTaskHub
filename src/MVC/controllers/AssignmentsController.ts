import { Request, Response, NextFunction } from "express";
const { fetchAssignments, postSingleAssignment, fetchAssignmentById, patchAssignment, deleteAssignment } = require("../models/AssignmentsModel")
import { Assignment } from "../../db/data/test-data/assignments"

exports.getAssignments = (req: Request, res: Response, next: NextFunction) => {
    fetchAssignments()
    .then((assignments: Assignment[]) => {
        res.status(200).send({ assignments })
    })
    .catch((err: Error) => {
        next(err)
    })
}

exports.postAssignment = (req: Request, res: Response, next: NextFunction) => {
    postSingleAssignment(req.body)
    .then((assignment: Assignment) => {
        res.status(201).send({ assignment })
    })
    .catch((err: Error) => {
        next(err)
    })
}

exports.getAssignmentById = (req: Request, res: Response, next: NextFunction) => {
    fetchAssignmentById(req.params.assignment_id)
    .then((assignment: Assignment) => {
        res.status(200).send({ assignment })
    })
    .catch((err: Error) => {
        next(err)
    })
}

exports.patchAssignmentById = (req: Request, res: Response, next: NextFunction) => {
    fetchAssignmentById(req.params.assignment_id)
    .then(() => {
        return patchAssignment(req.params.assignment_id, req.body)
    })
    .then((assignment: Assignment) => {
        res.status(200).send({ assignment })
    })
    .catch((err: Error) => {
        next(err)
    })
}

exports.deleteAssignmentById = (req: Request, res: Response, next: NextFunction) => {
    fetchAssignmentById(req.params.assignment_id)
    .then(() => {
        return deleteAssignment(req.params.assignment_id)
    })
    .then(() => {
        res.sendStatus(204)
    })
    .catch((err: Error) => {
        next(err)
    })
}
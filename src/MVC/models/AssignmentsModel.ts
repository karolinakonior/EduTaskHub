const db = require("../../../dist/db/pool.js");
import { Assignment } from "../../db/data/test-data/assignments";

type AssignmentProps = {
    rows: Assignment[]
}

exports.fetchAssignments = () => {
    return db.query("SELECT * FROM assignments")
    .then((assignments: AssignmentProps) => { 
        return assignments.rows;
    })
}

exports.postSingleAssignment = (assignment: Assignment) => {
    if(!assignment.name || !assignment.subject_id || !assignment.teacher_id || !assignment.year_id || !assignment.due_date || !assignment.description) return Promise.reject({ status: 400, msg: "Bad request" })

    return db.query(`INSERT INTO assignments (name, subject_id, teacher_id, year_id, due_date, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [assignment.name, assignment.subject_id, assignment.teacher_id, assignment.year_id, assignment.due_date, assignment.description])
    .then((assignment: AssignmentProps) => {
        return assignment.rows[0];
    })
}

exports.fetchAssignmentById = (assignment_id: number) => {
    return db.query(`SELECT * FROM assignments WHERE assignment_id = $1`, [assignment_id])
    .then((assignment: AssignmentProps) => {
        if(assignment.rows.length === 0) return Promise.reject({ status: 404, msg: "Assignment not found" })
        return assignment.rows[0];
    })
}
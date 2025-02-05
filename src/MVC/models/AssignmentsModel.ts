const db = require("../../../dist/db/pool.js");
import { Assignment } from "../../types/Assignment";
import { Feedback } from "../../types/Feedback";
import { AssignmentProps } from "../../types/AssignmentProps";

type FeedbackProps = {
    rows: Feedback[]
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

exports.patchAssignment = (assignment_id: number, body: Assignment) => {
    if(!body.name || !body.subject_id || !body.teacher_id || !body.year_id || !body.due_date || !body.description) return Promise.reject({ status: 400, msg: "Bad request" })
    return db.query(`UPDATE assignments SET name = $1, subject_id = $2, teacher_id = $3, year_id = $4, due_date = $5, description = $6 WHERE assignment_id = $7 RETURNING *`, [body.name, body.subject_id, body.teacher_id, body.year_id, body.due_date, body.description, assignment_id])
    .then((assignment: AssignmentProps) => {
        return assignment.rows[0];
    })
}

exports.deleteAssignment = (assignment_id: number) => {
    return db.query(`DELETE FROM assignments WHERE assignment_id = $1`, [assignment_id])
}

exports.fetchFeedbackByAssignmentId = (assignment_id: number) => {
    return db.query(`SELECT * FROM feedback JOIN submissions ON feedback.submission_id = submissions.submission_id WHERE assignment_id = $1`, [assignment_id])
    .then((feedback: FeedbackProps) => {
        return feedback.rows;
    })
}

exports.postFeedback = (body: Feedback) => {
    if(!body.submission_id || !body.feedback || !body.grade || !body.teacher_id || !body.student_id) return Promise.reject({ status: 400, msg: "Bad request" })
    return db.query(`INSERT INTO feedback (submission_id, feedback, grade, teacher_id, student_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [body.submission_id, body.feedback, body.grade, body.teacher_id, body.student_id])
    .then((feedback: FeedbackProps) => {
        return feedback.rows[0];
    })
}
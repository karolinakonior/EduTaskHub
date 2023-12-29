"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../../dist/db/pool.js");
exports.fetchAssignments = () => {
    return db.query("SELECT * FROM assignments")
        .then((assignments) => {
        return assignments.rows;
    });
};
exports.postSingleAssignment = (assignment) => {
    if (!assignment.name || !assignment.subject_id || !assignment.teacher_id || !assignment.year_id || !assignment.due_date || !assignment.description)
        return Promise.reject({ status: 400, msg: "Bad request" });
    return db.query(`INSERT INTO assignments (name, subject_id, teacher_id, year_id, due_date, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [assignment.name, assignment.subject_id, assignment.teacher_id, assignment.year_id, assignment.due_date, assignment.description])
        .then((assignment) => {
        return assignment.rows[0];
    });
};

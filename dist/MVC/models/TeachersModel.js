"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../../dist/db/pool.js");
exports.fetchTeachers = () => {
    return db.query(`SELECT * FROM teachers;`)
        .then(({ rows }) => {
        return rows;
    });
};
exports.fetchTeacherById = (teacher_id) => {
    return db.query(`SELECT * FROM teachers WHERE teacher_id = $1;`, [teacher_id])
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Teacher not found" });
        }
        return rows[0];
    });
};

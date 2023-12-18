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
exports.patchTeacher = (teacher_id, teacher) => {
    if (!teacher.first_name ||
        !teacher.last_name ||
        !teacher.email ||
        !teacher.password) {
        return Promise.reject({ status: 400, msg: "Bad request" });
    }
    return db.query(`UPDATE teachers SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE teacher_id = $5 RETURNING *;`, [teacher.first_name, teacher.last_name, teacher.email, teacher.password, teacher_id])
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Teacher not found" });
        }
        return rows[0];
    });
};

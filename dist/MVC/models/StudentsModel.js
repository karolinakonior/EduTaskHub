"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../../dist/db/pool.js");
exports.fetchStudents = () => {
    return db.query(`SELECT * FROM students;`)
        .then((result) => {
        return result.rows;
    });
};

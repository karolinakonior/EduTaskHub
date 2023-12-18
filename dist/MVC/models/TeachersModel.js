"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../../dist/db/pool.js");
exports.fetchTeachers = () => {
    return db.query(`SELECT * FROM teachers;`)
        .then(({ rows }) => {
        return rows;
    });
};

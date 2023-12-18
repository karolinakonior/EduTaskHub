"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const db = require("../../pool");
const format = require("pg-format");
const seed = ({ teachersData }) => {
    return db
        .query(`DROP TABLE IF EXISTS teachers;`)
        .then(() => {
        return db.query(`CREATE TABLE teachers (
            teacher_id SERIAL PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
            );`);
    })
        .then(() => {
        const formattedTeachersData = format(`INSERT INTO teachers
            (teacher_id, first_name, last_name, email, password)
            VALUES %L RETURNING *;`, teachersData.teachers.map((teacher) => [
            teacher.teacher_id,
            teacher.first_name,
            teacher.last_name,
            teacher.email,
            teacher.password
        ]));
        return db.query(formattedTeachersData);
    });
};
exports.seed = seed;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const db = require("../../pool");
const format = require("pg-format");
const seed = ({ teachersData, studentsData, subjectsData, teachersSubjectsData, studentsSubjectsData, yearsData }) => {
    return db
        .query(`DROP TABLE IF EXISTS teachers_subjects CASCADE;`)
        .then(() => {
        return db.query(`DROP TABLE IF EXISTS years CASCADE;`);
    })
        .then(() => {
        return db.query(`DROP TABLE IF EXISTS students_subjects CASCADE;`);
    })
        .then(() => {
        return db.query(`DROP TABLE IF EXISTS subjects CASCADE;`);
    })
        .then(() => {
        return db.query(`DROP TABLE IF EXISTS students CASCADE;`);
    })
        .then(() => {
        return db.query(`DROP TABLE IF EXISTS teachers CASCADE;`);
    })
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
        return db.query(`CREATE TABLE students (
            student_id SERIAL PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
            );`);
    })
        .then(() => {
        return db.query(`CREATE TABLE subjects (
            subject_id SERIAL PRIMARY KEY,
            subject_name VARCHAR(255) NOT NULL
            );`);
    })
        .then(() => {
        return db.query(`CREATE TABLE teachers_subjects (
            subject_id INT REFERENCES subjects(subject_id) ON DELETE CASCADE,
            teacher_id INT REFERENCES teachers(teacher_id) ON DELETE CASCADE
            );`);
    })
        .then(() => {
        return db.query(`CREATE TABLE students_subjects (
            student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
            subject_id INT REFERENCES subjects(subject_id) ON DELETE CASCADE
            );`);
    })
        .then(() => {
        return db.query(`CREATE TABLE years (
            year_id SERIAL PRIMARY KEY,
            year INT NOT NULL
            );`);
    })
        .then(() => {
        const formattedTeachersData = format(`INSERT INTO teachers
            (first_name, last_name, email, password)
            VALUES %L RETURNING *;`, teachersData.teachers.map((teacher) => [
            teacher.first_name,
            teacher.last_name,
            teacher.email,
            teacher.password
        ]));
        return db.query(formattedTeachersData);
    })
        .then(() => {
        const formattedStudentsData = format(`INSERT INTO students
            (first_name, last_name, email, password)
            VALUES %L RETURNING *;`, studentsData.students.map((student) => [
            student.first_name,
            student.last_name,
            student.email,
            student.password
        ]));
        return db.query(formattedStudentsData);
    })
        .then(() => {
        const formattedSubjectsData = format(`INSERT INTO subjects
            (subject_name)
            VALUES %L RETURNING *;`, subjectsData.subjects.map((subject) => [
            subject.subject_name
        ]));
        return db.query(formattedSubjectsData);
    })
        .then(() => {
        const formattedTeachersSubjectsData = format(`INSERT INTO teachers_subjects
            (subject_id, teacher_id)
            VALUES %L RETURNING *;`, teachersSubjectsData.teachersSubjects.map((teacherSubject) => [
            teacherSubject.subject_id,
            teacherSubject.teacher_id
        ]));
        return db.query(formattedTeachersSubjectsData);
    })
        .then(() => {
        const formattedStudentsSubjectsData = format(`INSERT INTO students_subjects
            (subject_id, student_id)
            VALUES %L RETURNING *;`, studentsSubjectsData.studentsSubjects.map((studentSubject) => [
            studentSubject.subject_id,
            studentSubject.student_id
        ]));
        return db.query(formattedStudentsSubjectsData);
    })
        .then(() => {
        const formattedYearsData = format(`INSERT INTO years
            (year)
            VALUES %L RETURNING *;`, yearsData.years.map((year) => [
            year.year
        ]));
        return db.query(formattedYearsData);
    });
};
exports.seed = seed;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const db = require("../../pool");
const format = require("pg-format");
const seed = ({ teachersData, studentsData, subjectsData, teachersSubjectsData, studentsSubjectsData, yearsData, studentsYearData, assignmentsData, submissionsData }) => {
    return db
        .query(`DROP TABLE IF EXISTS teachers_subjects CASCADE;`)
        .then(() => {
        return db.query(`DROP TABLE IF EXISTS submissions CASCADE;`);
    })
        .then(() => {
        return db.query(`DROP TABLE IF EXISTS assignments CASCADE;`);
    })
        .then(() => {
        return db.query(`DROP TABLE IF EXISTS students_year CASCADE;`);
    })
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
        return db.query(`CREATE TABLE students_year (
            student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
            year_id INT REFERENCES years(year_id) ON DELETE CASCADE
        );`);
    })
        .then(() => {
        return db.query(`CREATE TABLE assignments (
            assignment_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(500) NOT NULL,
            due_date DATE NOT NULL,
            teacher_id INT REFERENCES teachers(teacher_id) ON DELETE CASCADE,
            year_id INT REFERENCES years(year_id) ON DELETE CASCADE,
            subject_id INT REFERENCES subjects(subject_id) ON DELETE CASCADE
        );`);
    })
        .then(() => {
        return db.query(`CREATE TABLE submissions (
            submission_id SERIAL PRIMARY KEY,
            student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
            assignment_id INT REFERENCES assignments(assignment_id) ON DELETE CASCADE,
            solution VARCHAR(2000) NOT NULL,
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    })
        .then(() => {
        const formattedStudentsYearData = format(`INSERT INTO students_year
            (student_id, year_id)
            VALUES %L RETURNING *;`, studentsYearData.studentsYear.map((studentYear) => [
            studentYear.student_id,
            studentYear.year_id
        ]));
        return db.query(formattedStudentsYearData);
    })
        .then(() => {
        const formattedAssignmentsData = format(`INSERT INTO assignments
            (name, description, due_date, teacher_id, year_id, subject_id)
            VALUES %L RETURNING *;`, assignmentsData.assignments.map((assignment) => [
            assignment.name,
            assignment.description,
            assignment.due_date,
            assignment.teacher_id,
            assignment.year_id,
            assignment.subject_id
        ]));
        return db.query(formattedAssignmentsData);
    })
        .then(() => {
        const formattedSubmissionsData = format(`INSERT INTO submissions
            (student_id, assignment_id, solution, submitted_at)
            VALUES %L RETURNING *;`, submissionsData.submissions.map((submission) => [
            submission.student_id,
            submission.assignment_id,
            submission.solution,
            submission.submitted_at
        ]));
        return db.query(formattedSubmissionsData);
    });
};
exports.seed = seed;

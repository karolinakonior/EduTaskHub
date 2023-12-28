import { type Student } from "../../db/data/test-data/students";
const db = require("../../../dist/db/pool.js");
const bcrypt = require("bcrypt");

type StudentsProps = {
    rows: Student[]
}

type SubjectsProps = {
    rows: {
        subject_id: number,
        subject_name: string
    }[]
}

type YearProps = {
    rows: {
        year: number,
        year_id: number,
        student_id: number
    }[]
}

exports.fetchStudents = () => {
    return db.query(`SELECT * FROM students;`)
    .then((result: StudentsProps) => { 
        return result.rows;
    })
}

exports.fetchStudentById = (student_id: number) => {
    return db.query(`SELECT * FROM students WHERE student_id = $1;`, [student_id])
    .then((result: StudentsProps) => {
        if(result.rows.length === 0) return Promise.reject({ status: 404, msg: "Student not found" });
        return result.rows[0];
    })
}

exports.postSingleUser = (student: Student) => {
    if(!student.first_name || !student.last_name || !student.email || !student.password) return Promise.reject({ status: 400, msg: "Bad request" })

    return bcrypt
    .genSalt(10)
    .then((response: string) => {
      const hashedPassword = bcrypt.hash(student.password, response);
      return hashedPassword;
    })
    .then((hashedPassword: string) => {
        return db.query(`INSERT INTO students (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *;`, [student.first_name, student.last_name, student.email, hashedPassword])
    })
    .then((result: StudentsProps) => {
        return result.rows[0];
    })
}

exports.patchStudent = (student_id: number, student: Student) => {
    return db.query(`UPDATE students SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE student_id = $5 RETURNING *;`, [student.first_name, student.last_name, student.email, student.password, student_id])
    .then((result: StudentsProps) => {
        return result.rows[0];
    })
}

exports.deleteStudent = (student_id: number) => {
    return db.query(`DELETE FROM students WHERE student_id = $1;`, [student_id])
}

exports.fetchStudentSubjects = (student_id: number) => {
    return db.query(`SELECT students_subjects.subject_id, subjects.subject_name FROM students_subjects LEFT JOIN subjects ON students_subjects.subject_id = subjects.subject_id WHERE student_id = $1;`, [student_id])
    .then((result: SubjectsProps) => {
        return result.rows;
    })
}

exports.postNewStudentSubject = (student_id: number, subject_name: string) => {
    return db.query(`INSERT INTO students_subjects (student_id, subject_id) VALUES ($1, (SELECT subject_id FROM subjects WHERE subject_name = $2)) RETURNING *;`, [student_id, subject_name])
    .then((result: SubjectsProps) => {
        if(typeof result.rows[0].subject_id !== "number") return Promise.reject({ status: 400, msg: "Subject not found" })
        return result.rows[0];
    })
}

exports.deleteStudentSubject = (student_id: number, subject_id: number) => {
    return db.query(`DELETE FROM students_subjects WHERE student_id = $1 AND subject_id = $2;`, [student_id, subject_id])
}

exports.fetchStudentYear = (student_id: number) => {
    return db.query(`SELECT * FROM students_year LEFT JOIN years ON students_year.year_id = years.year_id WHERE student_id = $1;`, [student_id])
    .then((result: YearProps) => {
        return result.rows;
    })
}

exports.postYear = (student_id: number, year: number) => {
    return db.query(`INSERT INTO students_year (student_id, year_id) VALUES ($1, (SELECT year_id FROM years WHERE year = $2)) RETURNING *;`, [student_id, year])
    .then((result: YearProps) => {
        if(typeof result.rows[0].year_id !== "number") return Promise.reject({ status: 400, msg: "Year not found" })
        return result.rows[0];
    })
}

exports.deleteStudentYear = (student_id: number, year_id: number) => {
    return db.query(`DELETE FROM students_year WHERE student_id = $1 AND year_id = $2;`, [student_id, year_id])
}

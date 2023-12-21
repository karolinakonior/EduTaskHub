import { type Student } from "../../db/data/test-data/students";
const db = require("../../../dist/db/pool.js");
const bcrypt = require("bcrypt");

type StudentsProps = {
    rows: Student[]
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

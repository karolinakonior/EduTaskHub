import { type Student } from "../../types/Student";
import { type Submission } from "../../types/Submission";
import { AssignmentProps } from "../../types/AssignmentProps";
import { SubjectProps } from "../../types/SubjectProps";
const db = require("../../../dist/db/pool.js");
const bcrypt = require("bcrypt");

type StudentsProps = {
    rows: Student[]
}

type YearProps = {
    rows: {
        year: number,
        year_id: number,
        student_id: number
    }[]
}

type SubmissionProps = {
    rows: Submission[]
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
    .then((result: SubjectProps) => {
        return result.rows;
    })
}

exports.postNewStudentSubject = (student_id: number, subject_name: string) => {
    return db.query(`INSERT INTO students_subjects (student_id, subject_id) VALUES ($1, (SELECT subject_id FROM subjects WHERE subject_name = $2)) RETURNING *;`, [student_id, subject_name])
    .then((result: SubjectProps) => {
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

exports.fetchStudentAssignements = (student_id: number) => {
    return db.query(`SELECT DISTINCT assignments.*
    FROM assignments 
    JOIN students_subjects ON students_subjects.subject_id = assignments.subject_id 
    JOIN students_year ON students_year.year_id = assignments.year_id 
    WHERE students_year.student_id = $1;`, [student_id])
    .then((result: AssignmentProps) => {
        return result.rows;
    })
}

exports.fetchStudentSubmissions = (student_id: number) => {
    return db.query(`SELECT * FROM submissions WHERE student_id = $1;`, [student_id])
    .then((result: SubmissionProps) => {
        return result.rows;
    })
}

exports.postSubmission = (student_id: number, assignment_id: number, solution: string) => {
    if(!solution || !student_id || !assignment_id) return Promise.reject({ status: 400, msg: "Bad request" })
    return db.query(`INSERT INTO submissions (student_id, assignment_id, solution) VALUES ($1, $2, $3) RETURNING *;`, [student_id, assignment_id, solution])
    .then((result: SubmissionProps) => {
        return result.rows[0];
    })
}

exports.fetchStudentSubmissionByID = (student_id: number, submission_id: number) => {
    return db.query(`SELECT * FROM submissions WHERE student_id = $1 AND submission_id = $2;`, [student_id, submission_id])
    .then((result: SubmissionProps) => {
        if(result.rows.length === 0) return Promise.reject({ status: 404, msg: "Submission not found" })
        return result.rows[0];
    })
}
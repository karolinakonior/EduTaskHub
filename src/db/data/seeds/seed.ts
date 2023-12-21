import { Teacher } from "../test-data/teachers"
import { Student } from "../test-data/students"

const db = require("../../pool");
const format = require("pg-format");

type Data = {
    teachersData: {
        teachers: Teacher[]
    },
    studentsData: {
        students: Student[]
    }
}

export const seed = ({ teachersData, studentsData }: Data) => {
    return db
    .query(`DROP TABLE IF EXISTS students CASCADE;`)
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS teachers CASCADE;`)
    })
    .then(() => {
        return db.query(`CREATE TABLE teachers (
            teacher_id SERIAL PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
            );`)
    })
    .then(() => {
        return db.query(`CREATE TABLE students (
            student_id SERIAL PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
            );`)
    })
    .then(() => {
        const formattedTeachersData = format(
            `INSERT INTO teachers
            (first_name, last_name, email, password)
            VALUES %L RETURNING *;`,
            teachersData.teachers.map((teacher: Teacher) => [
                teacher.first_name,
                teacher.last_name,
                teacher.email,
                teacher.password
            ])
        )
        return db.query(formattedTeachersData)
    })
    .then(() => {
        const formattedStudentsData = format(
            `INSERT INTO students
            (first_name, last_name, email, password)
            VALUES %L RETURNING *;`,
            studentsData.students.map((student: Student) => [
                student.first_name,
                student.last_name,
                student.email,
                student.password
            ])
        )
        return db.query(formattedStudentsData)
    })
}
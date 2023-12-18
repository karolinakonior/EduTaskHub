import { Teacher } from "../test-data/teachers"

const db = require("../../pool");
const format = require("pg-format");

type Data = {
    teachersData: {
        teachers: Teacher[]
    }
}

export const seed = ({ teachersData }: Data) => {
    return db
    .query(`DROP TABLE IF EXISTS teachers;`)
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
}
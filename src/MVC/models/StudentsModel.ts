import { type Student } from "../../db/data/test-data/students";
const db = require("../../../dist/db/pool.js");

type StudentsProps = {
    rows: Student[]
}

exports.fetchStudents = () => {
    return db.query(`SELECT * FROM students;`)
    .then((result: StudentsProps) => { 
        return result.rows;
    })
}
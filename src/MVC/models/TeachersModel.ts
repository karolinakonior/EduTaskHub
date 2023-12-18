import { type Teacher } from "../../db/data/test-data/teachers"
const db = require("../../../dist/db/pool.js");

type TeacherProps = {
    rows: Teacher[]
}

exports.fetchTeachers = () => {
    return db.query(`SELECT * FROM teachers;`)
    .then(({ rows }: TeacherProps) => {
        return rows;
    })
}
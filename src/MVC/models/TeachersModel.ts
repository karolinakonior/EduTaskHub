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

exports.fetchTeacherById = (teacher_id: number) => {
    return db.query(`SELECT * FROM teachers WHERE teacher_id = $1;`, [teacher_id])
    .then(({ rows }: TeacherProps) => {
        if(rows.length === 0) { return Promise.reject({ status: 404, msg: "Teacher not found" })}
        return rows[0];
    })
}
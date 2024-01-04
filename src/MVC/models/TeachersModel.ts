import { type Teacher } from "../../types/Teacher"
import { type Subject } from "../../types/Subject"
const { fetchSubjects } = require("./SubjectsModel");
const bcrypt = require("bcrypt");
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

exports.patchTeacher = (teacher_id: number, teacher: Teacher) => {
    if( 
        !teacher.first_name ||
        !teacher.last_name ||
        !teacher.email 
    ) {
        return Promise.reject({ status: 400, msg: "Bad request" })
    }
   return db.query(
        `UPDATE teachers SET first_name = $1, last_name = $2, email = $3 WHERE teacher_id = $4 RETURNING *;`,
        [teacher.first_name, teacher.last_name, teacher.email, teacher_id]
   )
   .then(({ rows }: TeacherProps) => {
        if(rows.length === 0) { return Promise.reject({ status: 404, msg: "Teacher not found" })}
        return rows[0];
   })
}

exports.postNewTeacher = (teacher: Teacher) => {
    if( 
        !teacher.first_name ||
        !teacher.last_name ||
        !teacher.email 
    ) {
        return Promise.reject({ status: 400, msg: "Bad request" })
    }

    return db.query(
        `INSERT INTO teachers (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *;`,
            [teacher.first_name, teacher.last_name, teacher.email]
        )
    .then(({ rows }: TeacherProps) => {
        return rows[0];
    })
}

exports.deleteTeacher = (teacher_id: number) => {
    return db.query(`DELETE FROM teachers WHERE teacher_id = $1;`, [teacher_id])
}

exports.fetchTeachersSubject = (teacher_id: number) => {
    return db.query(`SELECT * FROM teachers_subjects LEFT JOIN subjects ON teachers_subjects.subject_id = subjects.subject_id WHERE teacher_id = $1;`, [teacher_id])
    .then(({ rows }: TeacherProps) => {
        return rows;
    })
}

exports.postNewTeachersSubject = (teacher_id: number, subject_name: string) => {
    let subject_id = 0;
    return fetchSubjects()
    .then((subjects: Subject[]) => {
        return subjects.forEach((subject: Subject) => {
            if(subject.subject_name === subject_name) {
                subject_id = subject.subject_id;
            }
        })
    })
    .then(() => {
        return db.query(`INSERT INTO teachers_subjects (teacher_id, subject_id) VALUES ($1, $2) RETURNING *;`, [teacher_id, subject_id])
    })
    .then(({ rows }: TeacherProps) => {
        return rows[0];
    })
}

exports.deleteSingleTeachersSubject = (teacher_id: number, subject_id: number) => {
    return db.query(`DELETE FROM teachers_subjects WHERE teacher_id = $1 AND subject_id = $2;`, [teacher_id, subject_id])
}
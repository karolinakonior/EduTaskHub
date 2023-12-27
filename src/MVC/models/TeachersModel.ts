import { type Teacher } from "../../db/data/test-data/teachers"
import { type Subject } from "../../db/data/test-data/subjects"
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
        !teacher.email ||
        !teacher.password
    ) {
        return Promise.reject({ status: 400, msg: "Bad request" })
    }
   return db.query(
        `UPDATE teachers SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE teacher_id = $5 RETURNING *;`,
        [teacher.first_name, teacher.last_name, teacher.email, teacher.password, teacher_id]
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
        !teacher.email ||
        !teacher.password
    ) {
        return Promise.reject({ status: 400, msg: "Bad request" })
    }
    return bcrypt
    .genSalt(10)
    .then((response: string) => {
      const hashedPassword = bcrypt.hash(teacher.password, response);
      return hashedPassword;
    })
    .then((hashedPassword: string) => {
        return db.query(
            `INSERT INTO teachers (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *;`,
            [teacher.first_name, teacher.last_name, teacher.email, hashedPassword]
        )
    })
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
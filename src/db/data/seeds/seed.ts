import { Teacher } from "../../../types/Teacher"
import { Student } from "../../../types/Student"
import { Subject } from "../../../types/Subject"
import { TeacherSubject } from "../../../types/TeacherSubject"
import { StudentSubject } from "../../../types/StudentSubject"
import { Year } from "../../../types/Year"
import { StudentYear } from "../../../types/StudentYear"
import { Assignment } from "../../../types/Assignment"
import { Submission } from "../../../types/Submission"
import { Feedback } from "../../../types/Feedback"

const db = require("../../pool");
const format = require("pg-format");

type Data = {
    teachersData: {
        teachers: Teacher[]
    },
    studentsData: {
        students: Student[]
    },
    subjectsData: {
        subjects: Subject[]
    },
    teachersSubjectsData: {
        teachersSubjects: TeacherSubject[]
    },
    studentsSubjectsData: {
        studentsSubjects: StudentSubject[]
    },
    yearsData: {
        years: Year[]
    },
    studentsYearData: {
        studentsYear: StudentYear[]
    },
    assignmentsData: {
        assignments: Assignment[]
    },
    submissionsData: {
        submissions: Submission[]
    },
    feedbackData: {
        feedback: Feedback[]
    }   
}

export const seed = ({ teachersData, studentsData, subjectsData, teachersSubjectsData, studentsSubjectsData, yearsData, studentsYearData, assignmentsData, submissionsData, feedbackData }: Data) => {
    return db
    .query(`DROP TABLE IF EXISTS teachers_subjects CASCADE;`)
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS feedback CASCADE;`)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS submissions CASCADE;`)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS assignments CASCADE;`)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS students_year CASCADE;`)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS years CASCADE;`)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS students_subjects CASCADE;`)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS subjects CASCADE;`)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS students CASCADE;`)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS teachers CASCADE;`)
    })
    .then(() => {
        return db.query(`CREATE TABLE teachers (
            teacher_id SERIAL PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL
            );`)
    })
    .then(() => {
        return db.query(`CREATE TABLE students (
            student_id SERIAL PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL
            );`)
    })
    .then(() => {
        return db.query(`CREATE TABLE subjects (
            subject_id SERIAL PRIMARY KEY,
            subject_name VARCHAR(255) NOT NULL
            );`)
    })
    .then(() => {
        return db.query(`CREATE TABLE teachers_subjects (
            subject_id INT REFERENCES subjects(subject_id) ON DELETE CASCADE,
            teacher_id INT REFERENCES teachers(teacher_id) ON DELETE CASCADE
            );`)
    })
    .then(() => {
        return db.query(`CREATE TABLE students_subjects (
            student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
            subject_id INT REFERENCES subjects(subject_id) ON DELETE CASCADE
            );`)
    })
    .then(() => {
        return db.query(`CREATE TABLE years (
            year_id SERIAL PRIMARY KEY,
            year INT NOT NULL
            );`)
    })
    .then(() => {
        return db.query(`CREATE TABLE students_year (
            student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
            year_id INT REFERENCES years(year_id) ON DELETE CASCADE
        );`)
    })
    .then(() => {
        return db.query(`CREATE TABLE assignments (
            assignment_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(500) NOT NULL,
            due_date DATE NOT NULL,
            teacher_id INT REFERENCES teachers(teacher_id) ON DELETE CASCADE,
            year_id INT REFERENCES years(year_id) ON DELETE CASCADE,
            subject_id INT REFERENCES subjects(subject_id) ON DELETE CASCADE
        );`)
    })
    .then(() => {
        return db.query(`CREATE TABLE submissions (
            submission_id SERIAL PRIMARY KEY,
            student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
            assignment_id INT REFERENCES assignments(assignment_id) ON DELETE CASCADE,
            solution VARCHAR(2000) NOT NULL,
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`)
    })
    .then(() => {
        return db.query(`CREATE TABLE feedback (
            feedback_id SERIAL PRIMARY KEY,
            submission_id INT REFERENCES submissions(submission_id) ON DELETE CASCADE,
            student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
            feedback VARCHAR(2000) NOT NULL,
            grade VARCHAR(1) NOT NULL,
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            teacher_id INT REFERENCES teachers(teacher_id) ON DELETE CASCADE
        );`)
    })
    .then(() => {
        const formattedTeachersData = format(
            `INSERT INTO teachers
            (first_name, last_name, email)
            VALUES %L RETURNING *;`,
            teachersData.teachers.map((teacher: Teacher) => [
                teacher.first_name,
                teacher.last_name,
                teacher.email
            ])
        )
        return db.query(formattedTeachersData)
    })
    .then(() => {
        const formattedStudentsData = format(
            `INSERT INTO students
            (first_name, last_name, email)
            VALUES %L RETURNING *;`,
            studentsData.students.map((student: Student) => [
                student.first_name,
                student.last_name,
                student.email
            ])
        )
        return db.query(formattedStudentsData)
    })
    .then(() => {
        const formattedSubjectsData = format(
            `INSERT INTO subjects
            (subject_name)
            VALUES %L RETURNING *;`,
            subjectsData.subjects.map((subject: Subject) => [
                subject.subject_name
            ])
        )
        return db.query(formattedSubjectsData);
    })
    .then(() => {
        const formattedTeachersSubjectsData = format(
            `INSERT INTO teachers_subjects
            (subject_id, teacher_id)
            VALUES %L RETURNING *;`,
            teachersSubjectsData.teachersSubjects.map((teacherSubject: TeacherSubject) => [
                teacherSubject.subject_id,
                teacherSubject.teacher_id
            ])
        )
        return db.query(formattedTeachersSubjectsData);
    })
    .then(() => {
        const formattedStudentsSubjectsData = format(
            `INSERT INTO students_subjects
            (subject_id, student_id)
            VALUES %L RETURNING *;`,
            studentsSubjectsData.studentsSubjects.map((studentSubject: StudentSubject) => [
                studentSubject.subject_id,
                studentSubject.student_id
            ])
        )
        return db.query(formattedStudentsSubjectsData);
    })
    .then(() => {
        const formattedYearsData = format(
            `INSERT INTO years
            (year)
            VALUES %L RETURNING *;`,
            yearsData.years.map((year: Year) => [
                year.year
            ])
        )
        return db.query(formattedYearsData);
    })
    .then(() => {
        const formattedStudentsYearData = format(
            `INSERT INTO students_year
            (student_id, year_id)
            VALUES %L RETURNING *;`,
            studentsYearData.studentsYear.map((studentYear: StudentYear) => [
                studentYear.student_id,
                studentYear.year_id
            ])
        )
        return db.query(formattedStudentsYearData);
    })
    .then(() => {
        const formattedAssignmentsData = format(
            `INSERT INTO assignments
            (name, description, due_date, teacher_id, year_id, subject_id)
            VALUES %L RETURNING *;`,
            assignmentsData.assignments.map((assignment: Assignment) => [
                assignment.name,
                assignment.description,
                assignment.due_date,
                assignment.teacher_id,
                assignment.year_id,
                assignment.subject_id
            ])
        )
        return db.query(formattedAssignmentsData);
    })
    .then(() => {
        const formattedSubmissionsData = format(
            `INSERT INTO submissions
            (student_id, assignment_id, solution, submitted_at)
            VALUES %L RETURNING *;`,
            submissionsData.submissions.map((submission: Submission) => [
                submission.student_id,
                submission.assignment_id,
                submission.solution,
                submission.submitted_at
            ])
        )
        return db.query(formattedSubmissionsData);
    })
    .then(() => {
        const formattedFeedbackData = format(
            `INSERT INTO feedback
            (submission_id, student_id, feedback, grade, submitted_at, teacher_id)
            VALUES %L RETURNING *;`,
            feedbackData.feedback.map((feedback: Feedback) => [
                feedback.submission_id,
                feedback.student_id,
                feedback.feedback,
                feedback.grade,
                feedback.submitted_at,
                feedback.teacher_id
            ])
        )
        return db.query(formattedFeedbackData);
    })
}
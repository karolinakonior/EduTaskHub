\c eth_test

SELECT * FROM teachers;
SELECT * FROM students;
SELECT * FROM subjects;
SELECT * FROM teachers_subjects;
SELECT * FROM students_subjects;
SELECT * FROM years;
SELECT * FROM students_year;
SELECT * FROM assignments;
SELECT * FROM submissions;
SELECT * FROM feedback;

SELECT submissions.submission_id, submissions.student_id, submissions.assignment_id, submissions.submitted_at, submissions.solution, assignments.name, assignments.description, subjects.subject_name, assignments.teacher_id
FROM submissions
JOIN assignments ON submissions.assignment_id = assignments.assignment_id
JOIN subjects ON assignments.subject_id = subjects.subject_id
WHERE student_id = '1' AND submission_id = 1;

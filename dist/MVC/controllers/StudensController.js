"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { fetchStudents, fetchStudentById, postSingleUser, patchStudent, deleteStudent, fetchStudentSubjects, postNewStudentSubject, deleteStudentSubject, fetchStudentYear, postYear, deleteStudentYear, fetchStudentAssignements, fetchStudentSubmissions, postSubmission } = require("../models/StudentsModel");
exports.getStudents = (req, res, next) => {
    fetchStudents()
        .then((students) => {
        res.status(200).send({ students });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getStudentById = (req, res, next) => {
    fetchStudentById(req.params.student_id)
        .then((student) => {
        res.status(200).send({ student });
    })
        .catch((err) => {
        next(err);
    });
};
exports.postStudent = (req, res, next) => {
    fetchStudents()
        .then((students) => {
        let doesEmailExist = false;
        students.forEach((student) => {
            if (student.email === req.body.email)
                doesEmailExist = true;
        });
        if (doesEmailExist)
            return Promise.reject({ status: 400, msg: "Email already exists" });
    })
        .then(() => {
        return postSingleUser(req.body);
    })
        .then((student) => {
        res.status(201).send({ student });
    })
        .catch((err) => {
        next(err);
    });
};
exports.patchStudentById = (req, res, next) => {
    fetchStudentById(req.params.student_id)
        .then(() => {
        return patchStudent(req.params.student_id, req.body);
    })
        .then((student) => {
        res.status(200).send({ student });
    })
        .catch((err) => {
        next(err);
    });
};
exports.deleteStudentById = (req, res, next) => {
    fetchStudentById(req.params.student_id)
        .then(() => {
        deleteStudent(req.params.student_id);
    })
        .then(() => {
        res.sendStatus(204);
    })
        .catch((err) => {
        next(err);
    });
};
exports.getStudentSubjects = (req, res, next) => {
    return fetchStudentById(req.params.student_id)
        .then(() => {
        return fetchStudentSubjects(req.params.student_id);
    })
        .then((subjects) => {
        res.status(200).send({ subjects });
    })
        .catch((err) => {
        next(err);
    });
};
exports.postStudentSubjects = (req, res, next) => {
    fetchStudentById(req.params.student_id)
        .then(() => {
        return postNewStudentSubject(req.params.student_id, req.body.subject_name);
    })
        .then((subject) => {
        res.status(201).send({ subject });
    })
        .catch((err) => {
        next(err);
    });
};
exports.deleteStudentSubjectById = (req, res, next) => {
    fetchStudentById(req.params.student_id)
        .then(() => {
        return fetchStudentSubjects(req.params.student_id);
    })
        .then((subjects) => {
        let doesSubjectExist = false;
        subjects.map((subject) => {
            if (subject.subject_id === Number(req.params.subject_id))
                doesSubjectExist = true;
        });
        if (!doesSubjectExist)
            return Promise.reject({ status: 404, msg: "Subject not found" });
    })
        .then(() => {
        return deleteStudentSubject(req.params.student_id, req.params.subject_id);
    })
        .then(() => {
        res.sendStatus(204);
    })
        .catch((err) => {
        next(err);
    });
};
exports.getStudentYear = (req, res, next) => {
    fetchStudentById(req.params.student_id)
        .then(() => {
        return fetchStudentYear(req.params.student_id);
    })
        .then((year) => {
        res.status(200).send({ year });
    })
        .catch((err) => {
        next(err);
    });
};
exports.postStudentYear = (req, res, next) => {
    fetchStudentById(req.params.student_id)
        .then(() => {
        return fetchStudentYear(req.params.student_id);
    })
        .then((years) => {
        if (years.length !== 0)
            return Promise.reject({ status: 400, msg: "Student already has a year" });
    })
        .then(() => {
        return postYear(req.params.student_id, req.body.year);
    })
        .then((year) => {
        res.status(201).send({ year });
    })
        .catch((err) => {
        next(err);
    });
};
exports.deleteStudentYearById = (req, res, next) => {
    fetchStudentById(req.params.student_id)
        .then(() => {
        return fetchStudentYear(req.params.student_id);
    })
        .then((years) => {
        let doesYearExist = false;
        years.map((year) => {
            if (year.year_id === Number(req.params.year_id))
                doesYearExist = true;
        });
        if (!doesYearExist)
            return Promise.reject({ status: 404, msg: "Year not found" });
    })
        .then(() => {
        return deleteStudentYear(req.params.student_id, req.params.year_id);
    })
        .then(() => {
        res.sendStatus(204);
    })
        .catch((err) => {
        next(err);
    });
};
exports.getStudentAssignments = (req, res, next) => {
    fetchStudentById(req.params.student_id)
        .then(() => {
        return fetchStudentAssignements(req.params.student_id);
    })
        .then((assignments) => {
        res.status(200).send({ assignments });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getStudentSubmissions = (req, res, next) => {
    fetchStudentById(req.params.student_id)
        .then(() => {
        return fetchStudentSubmissions(req.params.student_id);
    })
        .then((submissions) => {
        res.status(200).send({ submissions });
    })
        .catch((err) => {
        next(err);
    });
};
exports.postStudentSubmission = (req, res, next) => {
    fetchStudentById(req.params.student_id)
        .then(() => {
        return postSubmission(req.params.student_id, req.body.assignment_id, req.body.solution);
    })
        .then((submission) => {
        res.status(201).send({ submission });
    })
        .catch((err) => {
        next(err);
    });
};

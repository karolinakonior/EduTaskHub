const { seed } = require("../dist/db/data/seeds/seed.js");
const testData = require("../dist/db/data/test-data/index");
const db = require("../dist/db/pool.js");
const request = require("supertest");
const { app } = require("../dist/api.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/students/:student_id/assignments", () => {
    test("200: responds with an array of assignments for the specified student", () => {
        return request(app)
            .get("/api/students/1/assignments")
            .expect(200)
            .then(({ body }) => {
                expect(body.assignments).toHaveLength(1);
                expect(body.assignments[0]).toEqual({
                    assignment_id: 1,
                    name: 'The effect of the concentration of salt solution on the mass of potatoes',
                    description: 'Write an essay on the effect of the concentration of salt solution on the mass of potatoes. Include a hypothesis, method, results, discussion and conclusion.',
                    due_date: "2020-11-06T23:00:00.000Z",
                    teacher_id: 1,
                    year_id: 1,
                    subject_id: 1
                });
            });
    })
    test("200: responds with an empty array when the specified student has no assignments", () => {
        return request(app)
            .get("/api/students/5/assignments")
            .expect(200)
            .then(({ body }) => {
                expect(body.assignments).toHaveLength(0);
            });
    })
    test("404: responds with an error message when the specified student does not exist", () => {
        return request(app)
            .get("/api/students/100/assignments")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Student not found");
            });
    })
    test("404: responds with an error message when the specified student_id is invalid", () => {
        return request(app)
            .get("/api/students/invalid/assignments")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Student not found");
            });
    })
})

describe("GET /api/students/:student_id/submissions", () => {
    test("200: responds with an array of submission for the specified student", () => {
        return request(app)
            .get("/api/students/1/submissions")
            .expect(200)
            .then(({ body }) => {
                expect(body.submissions).toHaveLength(1);
                expect(body.submissions[0]).toEqual({
                    submission_id: 1,
                    student_id: "1",
                    assignment_id: 1,
                    solution: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    submitted_at: expect.any(String)
                });
            });
    })
    test("200: responds with an empty array when the specified student has no submissions", () => {
        return request(app)
            .get("/api/students/5/submissions")
            .expect(200)
            .then(({ body }) => {
                expect(body.submissions).toHaveLength(0);
            });
    })
    test("404: responds with an error message when the specified student does not exist", () => {
        return request(app)
            .get("/api/students/100/submissions")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Student not found");
            });
    })
    test("404: responds with an error message when the specified student_id is invalid", () => {
        return request(app)
            .get("/api/students/invalid/submissions")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Student not found");
            });
    })
})

describe("POST /api/students/:student_id/submissions", () => {
    test("201: responds with the posted submission", () => {
        return request(app)
            .post("/api/students/3/submissions")
            .send({
                assignment_id: 2,
                solution: "This is a test submission"
            })
            .expect(201)
            .then(({ body }) => {
                expect(body.submission).toEqual({
                    submission_id: 2,
                    student_id: "3",
                    assignment_id: 2,
                    solution: "This is a test submission",
                    submitted_at: expect.any(String)
                });
            });
    })
    test("200: responds with the posted submission when passed extra properties", () => {
        return request(app)
            .post("/api/students/3/submissions")
            .send({
                assignment_id: 2,
                solution: "This is a test submission",
                extra: "This is an extra property"
            })
            .expect(201)
            .then(({ body }) => {
                expect(body.submission).toEqual({
                    submission_id: 2,
                    student_id: "3",
                    assignment_id: 2,
                    solution: "This is a test submission",
                    submitted_at: expect.any(String)
                });
            });
    })
    test("404: responds with an error message when the specified student does not exist", () => {
        return request(app)
            .post("/api/students/100/submissions")
            .send({
                assignment_id: 2,
                solution: "This is a test submission"
            })
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Student not found");
            });
    })
    test("404: responds with an error message when the specified student_id is invalid", () => {
        return request(app)
            .post("/api/students/invalid/submissions")
            .send({
                assignment_id: 2,
                solution: "This is a test submission"
            })
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Student not found");
            });
    })
    test("400: responds with an error message when the specified assignment_id is invalid", () => {
        return request(app)
            .post("/api/students/3/submissions")
            .send({
                assignment_id: "invalid",
                solution: "This is a test submission"
            })
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad request");
            });
    })
    test("400: responds with an error message when submission object is invalid", () => {
        return request(app)
            .post("/api/students/3/submissions")
            .send({
                assignment_id: 100
            })
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad request");
            });
    })
})

describe("GET /api/students/:student_id/submissions/:submission_id", () => {
    test("200: responds with the specified submission", () => {
        return request(app)
            .get("/api/students/1/submissions/1")
            .expect(200)
            .then(({ body }) => {
                expect(body.submission).toEqual({
                    submission_id: 1,
                    student_id: "1",
                    assignment_id: 1,
                    solution: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    submitted_at: expect.any(String)
                });
            });
    })
    test("404: responds with an error message when the specified student does not exist", () => {
        return request(app)
            .get("/api/students/100/submissions/1")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Student not found");
            });
    })
    test("404: responds with an error message when the specified submission does not exist", () => {
        return request(app)
            .get("/api/students/1/submissions/100")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Submission not found");
            });
    })
    test("404: responds with an error message when the specified student_id is invalid", () => {
        return request(app)
            .get("/api/students/invalid/submissions/1")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Student not found");
            });
    })
    test("400: responds with an error message when the specified submission_id is invalid", () => {
        return request(app)
            .get("/api/students/1/submissions/invalid")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad request");
            });
    })
})
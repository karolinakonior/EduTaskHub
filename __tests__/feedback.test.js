const { seed } = require("../dist/db/data/seeds/seed.js");
const testData = require("../dist/db/data/test-data/index");
const db = require("../dist/db/pool.js");
const request = require("supertest");
const { app } = require("../dist/api.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/assignments/:assignment_id/feedback", () => {
    test("200: responds with an array of feedback objects for the given assignment_id", () => {
        return request(app)
            .get("/api/assignments/1/feedback")
            .expect(200)
            .then(({ body }) => {
                expect(body.feedback).toHaveLength(1);
                expect(body.feedback[0]).toEqual(
                    expect.objectContaining({
                        feedback_id: 1,
                        submission_id: 1,
                        student_id: 1,
                        feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        submitted_at: expect.any(String),
                        grade: "A",
                        teacher_id: 1,
                    })
                );
            });
    })
    test("200: responds with an empty array when given an assignment_id with no feedback", () => {
        return request(app)
            .get("/api/assignments/2/feedback")
            .expect(200)
            .then(({ body }) => {
                expect(body.feedback).toHaveLength(0);
            });
    })
    test("404: responds with an error message when given an non-existing assignment_id", () => {
        return request(app)
            .get("/api/assignments/100/feedback")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Assignment not found");
            });
    })
    test("400: responds with an error message when given an invalid assignment_id", () => {
        return request(app)
            .get("/api/assignments/one/feedback")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad request");
            });
    })
})

describe("POST /api/assignments/:assignment_id/feedback", () => {
    test("201: responds with the posted feedback object", () => {
        return request(app)
            .post("/api/assignments/1/feedback")
            .send({
                student_id: 2,
                feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                grade: "A",
                teacher_id: 1,
                submission_id: 1,
            })
            .expect(201)
            .then(({ body }) => {
                expect(body.feedback).toEqual(
                    expect.objectContaining({
                        feedback_id: 2,
                        submission_id: 1,
                        student_id: 2,
                        feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        submitted_at: expect.any(String),
                        grade: "A",
                        teacher_id: 1,
                    })
                );
            });
    })
    test("400: responds with an error message when given an invalid assignment_id", () => {
        return request(app)
            .post("/api/assignments/one/feedback")
            .send({
                student_id: 2,
                feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                grade: "A",
                teacher_id: 1,
                submission_id: 1,
            })
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad request");
            });
    })
    test("400: responds with an error message when given an invalid feedback object", () => {
        return request(app)
            .post("/api/assignments/1/feedback")
            .send({
                student_id: 2,
                feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                grade: "A"
            })
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad request");
            });
    })
    test("404: responds with an error message when given an non-existing assignment_id", () => {
        return request(app)
            .post("/api/assignments/100/feedback")
            .send({
                student_id: 2,
                feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                grade: "A",
                teacher_id: 1,
                submission_id: 1,
            })
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Assignment not found");
            });
    })
    test("404: responds with an error message when given an non-existing student_id", () => {
        return request(app)
            .post("/api/assignments/1/feedback")
            .send({
                student_id: 100,
                feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                grade: "A",
                teacher_id: 1,
                submission_id: 1,
            })
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad request");
            });
    })
})

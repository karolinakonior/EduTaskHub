const { seed } = require("../dist/db/data/seeds/seed.js");
const testData = require("../dist/db/data/test-data/index");
const db = require("../dist/db/pool.js");
const request = require("supertest");
const { app } = require("../dist/api.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/assignments", () => {
    test("200: responds with an array of assignment objects", () => {
        return request(app)
            .get("/api/assignments")
            .expect(200)
            .then(({ body: { assignments } }) => {
                expect(assignments).toHaveLength(3);
                expect(assignments[0]).toEqual({
                    assignment_id: 1,
                    name: 'The effect of the concentration of salt solution on the mass of potatoes',
                    description: 'Write an essay on the effect of the concentration of salt solution on the mass of potatoes. Include a hypothesis, method, results, discussion and conclusion.',
                    due_date: "2020-11-07T00:00:00.000Z",
                    teacher_id: 1,
                    year_id: 1,
                    subject_id: 1
                })
            })
    })
})

describe("POST /api/assignments", () => {
    test("201: responds with the posted assignment", () => {
        return request(app)
            .post("/api/assignments")
            .send({
                name: "Test Assignment",
                description: "Test description",
                due_date: "2020-11-07",
                teacher_id: 1,
                year_id: 1,
                subject_id: 1
            })
            .expect(201)
            .then(({ body: { assignment } }) => {
                expect(assignment).toEqual({
                    assignment_id: 4,
                    name: "Test Assignment",
                    description: "Test description",
                    due_date: "2020-11-07T00:00:00.000Z",
                    teacher_id: 1,
                    year_id: 1,
                    subject_id: 1
                })
            })
    })
    test("400: responds with an error message when the request body is missing a required key", () => {
        return request(app)
            .post("/api/assignments")
            .send({
                name: "Test Assignment",
                description: "Test description",
                due_date: "2020-11-07",
                teacher_id: 1,
                year_id: 1
            })
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request");
            })
    })
    test("400: responds with an error message when the request body contains an invalid value", () => {
        return request(app)
            .post("/api/assignments")
            .send({
                name: "Test Assignment",
                description: "Test description",
                due_date: "2020-11-07",
                teacher_id: 1,
                year_id: 1,
                subject_id: "invalid"
            })
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request");
            })
    })
    test("400: responds with an error message when the teacher_id does not exist", () => {
        return request(app)
            .post("/api/assignments")
            .send({
                name: "Test Assignment",
                description: "Test description",
                due_date: "2020-11-07",
                teacher_id: 100,
                year_id: 1,
                subject_id: 1
            })
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request");
            })
    })
    test("400: responds with an error message when the year_id does not exist", () => {
        return request(app)
            .post("/api/assignments")
            .send({
                name: "Test Assignment",
                description: "Test description",
                due_date: "2020-11-07",
                teacher_id: 1,
                year_id: 100,
                subject_id: 1
            })
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request");
            })
    })
    test("400: responds with an error message when the subject_id does not exist", () => {
        return request(app)
            .post("/api/assignments")
            .send({
                name: "Test Assignment",
                description: "Test description",
                due_date: "2020-11-07",
                teacher_id: 1,
                year_id: 1,
                subject_id: 100
            })
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request");
            })
    })
})

describe("GET /api/assignments/:assignment_id", () => {
    test("200: responds with an assignment object", () => {
        return request(app)
            .get("/api/assignments/1")
            .expect(200)
            .then(({ body: { assignment } }) => {
                expect(assignment).toEqual({
                    assignment_id: 1,
                    name: 'The effect of the concentration of salt solution on the mass of potatoes',
                    description: 'Write an essay on the effect of the concentration of salt solution on the mass of potatoes. Include a hypothesis, method, results, discussion and conclusion.',
                    due_date: "2020-11-07T00:00:00.000Z",
                    teacher_id: 1,
                    year_id: 1,
                    subject_id: 1
                })
            })
    })
    test("404: responds with an error message when the assignment_id does not exist", () => {
        return request(app)
            .get("/api/assignments/100")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Assignment not found");
            })
    })
    test("400: responds with an error message when the assignment_id is invalid", () => {
        return request(app)
            .get("/api/assignments/invalid")
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request");
            })
    })
})
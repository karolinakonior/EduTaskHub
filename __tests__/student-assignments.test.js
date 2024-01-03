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
                    due_date: "2020-11-07T00:00:00.000Z",
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
    test("400: responds with an error message when the specified student_id is invalid", () => {
        return request(app)
            .get("/api/students/invalid/assignments")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad request");
            });
    })
})
const { seed } = require("../dist/db/data/seeds/seed.js");
const testData = require("../dist/db/data/test-data/index");
const db = require("../dist/db/pool.js");
const request = require("supertest");
const { app } = require("../dist/api.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/teachers", () => {
    test("200: responds with an array of teacher objects", () => {
        return request(app)
            .get("/api/teachers")
            .expect(200)
            .then(({ body: { teachers } }) => {
                expect(teachers).toHaveLength(5);
                teachers.forEach((teacher) => {
                    expect.objectContaining({
                        teacher_id: expect.any(Number),
                        first_name: expect.any(String),
                        last_name: expect.any(String),
                        email: expect.any(String),
                        password: expect.any(String)
                    })
                })
            })
    })
})

describe("GET /api/teachers/:teacher_id", () => {
    test("200: responds with a teacher object", () => {
        return request(app)
            .get("/api/teachers/1")
            .expect(200)
            .then(({ body: { teacher } }) => {
                expect(teacher).toEqual({
                    teacher_id: 1,
                    first_name: "John",
                    last_name: "Smith",
                    email: "email1@gmail.com",
                    password: "password"
                })
            })
    })
    test("404: responds with an error message when passed a non-existent teacher_id", () => {
        return request(app)
            .get("/api/teachers/100")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Teacher not found")
            })
    })
    test("400: responds with an error message when passed an invalid teacher_id", () => {
        return request(app)
            .get("/api/teachers/invalid")
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request")
            })
    })
})
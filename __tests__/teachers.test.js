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

describe("PATCH /api/teachers/:teacher_id", () => {
    test("200: responds with the updated teacher object", () => {
        return request(app)
            .patch("/api/teachers/1")
            .send({ first_name: "John", last_name: "Smith", email: "newemail@gmail.com", password: "password" })
            .expect(200)
            .then(({ body: { teacher } }) => {
                expect(teacher).toEqual({
                    teacher_id: 1,
                    first_name: "John",
                    last_name: "Smith",
                    email: "newemail@gmail.com",
                    password: "password"
                })
            })
    })
    test("200: responds with the updated teacher object when passed extra key", () => {
        return request(app)
            .patch("/api/teachers/1")
            .send({ first_name: "John", last_name: "Smith", email: "newemail@gmail.com", password: "password", extra: "extra" })
            .expect(200)
            .then(({ body: { teacher } }) => {
                expect(teacher).toEqual({
                    teacher_id: 1,
                    first_name: "John",
                    last_name: "Smith",
                    email: "newemail@gmail.com",
                    password: "password"
                })
            })
    })
    test("404: responds with an error message when passed a non-existent teacher_id", () => {
        return request(app)
            .patch("/api/teachers/100")
            .send({ first_name: "John", last_name: "Smith", email: "newemail@gmail.com", password: "password" })
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Teacher not found")
            })
    })
    test("400: responds with an error message when passed an invalid teacher_id", () => {
        return request(app)
            .patch("/api/teachers/invalid")
            .send({ first_name: "John", last_name: "Smith", email: "newemail@gmail.com", password: "password" })
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request")
            })
    })
    test("400: responds with an error message when passed an empty object", () => {
        return request(app)
            .patch("/api/teachers/1")
            .send({})
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request")
            })
    })
    test("400: responds with an error message when passed an invalid object", () => {
        return request(app)
            .patch("/api/teachers/1")
            .send({ first_name: "John", last_name: "Smith"})
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request")
            })
    })
})
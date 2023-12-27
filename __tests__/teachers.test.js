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

describe("POST /api/teachers", () => {
    test("201: responds with the new teacher object", () => {
        return request(app)
            .post("/api/teachers")
            .send({ first_name: "John", last_name: "Smith", email: "testemail@gmail.com", password: "password" })
            .expect(201)
            .then(({ body: { teacher } }) => {
                expect(teacher).toEqual({
                    teacher_id: 6,
                    first_name: "John",
                    last_name: "Smith",
                    email: "testemail@gmail.com",
                    password: expect.any(String)
            })
            })
    })
    test("201: responds with the new teacher object when passed extra key", () => {
        return request(app)
            .post("/api/teachers")
            .send({ first_name: "John", last_name: "Smith", email: "testemail@gmail.com", password: "password", extra: "extra" })
            .expect(201)
            .then(({ body: { teacher } }) => {
                expect(teacher).toEqual({
                    teacher_id: 6,
                    first_name: "John",
                    last_name: "Smith",
                    email: "testemail@gmail.com",
                    password: expect.any(String)
                })
            })
    })
    test("400: responds with an error message when passed an empty object", () => {
        return request(app)
            .post("/api/teachers")
            .send({})
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request")
            })
    })
    test("400: responds with an error message when passed an invalid object", () => {
        return request(app)
            .post("/api/teachers")
            .send({ first_name: "John", last_name: "Smith"})
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request")
            })
    })
})

describe("DELETE /api/teachers/:teacher_id", () => {
    test("204: responds with no content", () => {
        return request(app)
            .delete("/api/teachers/1")
            .expect(204)
    })
    test("404: responds with an error message when passed a non-existent teacher_id", () => {
        return request(app)
            .delete("/api/teachers/100")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Teacher not found")
            })
    })
})

describe("GET /api/teachers/:teacher_id/subjects", () => {
    test("200: responds with an array of subject objects", () => {
        return request(app)
            .get("/api/teachers/1/subjects")
            .expect(200)
            .then(({body}) => {
                expect(body).toHaveLength(1);
                expect(body).toEqual([ { subject_id: 1, teacher_id: 1, subject_name: 'Biology' } ])
            })
    })
    test("404: responds with an error message when passed a non-existent teacher_id", () => {
        return request(app)
            .get("/api/teachers/100/subjects")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Teacher not found")
            })
    })
    test("400: responds with an error message when passed an invalid teacher_id", () => {
        return request(app)
            .get("/api/teachers/invalid/subjects")
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request")
            })
    })
})

describe("POST /api/teachers/:teacher_id/subjects", () => {
    test("201: responds with the new subject object", () => {
        return request(app)
            .post("/api/teachers/1/subjects")
            .send({ subject_name: "Chemistry" })
            .expect(201)
            .then(({ body }) => {
                expect(body).toEqual({
                    subject_id: 2,
                    teacher_id: 1,
                })
            })
    })
    test("201: responds with the new subject object when passed extra key", () => {
        return request(app)
            .post("/api/teachers/1/subjects")
            .send({ subject_name: "Chemistry", extra: "extra" })
            .expect(201)
            .then(({ body }) => {
                expect(body).toEqual({
                    subject_id: 2,
                    teacher_id: 1,
                })
            })
    })
    test("404: responds with an error message when passed a non-existent teacher_id", () => {
        return request(app)
            .post("/api/teachers/100/subjects")
            .send({ subject_name: "Chemistry" })
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Teacher not found")
            })
    })
    test("400: responds with an error message when passed an invalid teacher_id", () => {
        return request(app)
            .post("/api/teachers/invalid/subjects")
            .send({ subject_name: "Chemistry" })
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request")
            })
    })
    test("400: responds with an error message when passed an empty object", () => {
        return request(app)
            .post("/api/teachers/1/subjects")
            .send({})
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request")
            })
    })
    test("400: responds with an error message when passed an invalid object", () => {
        return request(app)
            .post("/api/teachers/1/subjects")
            .send({ subject_name: "Invalid subject", extra: "extra" })
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request")
            })
    })
})

describe("DELETE /api/teachers/:teacher_id/subjects/:subject_id", () => {
    test("204: responds with no content", () => {
        return request(app)
            .delete("/api/teachers/1/subjects/1")
            .expect(204)
    })
    test("404: responds with an error message when passed a non-existent teacher_id", () => {
        return request(app)
            .delete("/api/teachers/100/subjects/1")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Teacher not found")
            })
    })
})
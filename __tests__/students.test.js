const { seed } = require("../dist/db/data/seeds/seed.js");
const testData = require("../dist/db/data/test-data/index");
const db = require("../dist/db/pool.js");
const request = require("supertest");
const { app } = require("../dist/api.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe(" GET /api/students", () => {
    test("200: responds with an array of student objects", () => {
        return request(app)
            .get("/api/students")
            .expect(200)
            .then(({ body: { students } }) => {
                expect(students).toHaveLength(5);
                expect(students[0]).toEqual({
                    student_id: 1,
                    first_name: "Kayleigh",
                    last_name: "Smith",
                    email: "student1@gmail.com",
                    password: "password"
                })
            })
    })
})

describe(" GET /api/students/:student_id", () => {
    test("200: responds with a student object", () => {
        return request(app)
            .get("/api/students/1")
            .expect(200)
            .then(({ body: { student } }) => {
                expect(student).toEqual({
                    student_id: 1,
                    first_name: "Kayleigh",
                    last_name: "Smith",
                    email: "student1@gmail.com",
                    password: "password"
                })
            })
    })
    test("404: responds with an error message when passed a non-existent student_id", () => {
        return request(app)
            .get("/api/students/100")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Student not found")
            })
    })
    test("400: responds with an error message when passed an invalid student_id", () => {
        return request(app)
            .get("/api/students/invalid")
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request")
            })
    })
})

describe(" POST /api/students", () => {
    test("201: responds with the posted student object", () => {
        return request(app)
            .post("/api/students")
            .send({
                first_name: "Test",
                last_name: "Student",
                email: "testemail@gmail.com",
                password: "password"
            })
            .expect(201)
            .then(({ body: { student } }) => {
                expect(student.student_id).toBe(6);
                expect(student.first_name).toBe("Test");
                expect(student.last_name).toBe("Student");
                expect(student.email).toBe("testemail@gmail.com")
            })
    })
    test("201: responds with the posted student object when passed a student object with extra keys", () => {
        return request(app)
            .post("/api/students")
            .send({
                first_name: "Test",
                last_name: "Student",
                email: "student12@gmail.com",
                password: "password",
                extra: "key"
            })
            .expect(201)
            .then(({ body: { student } }) => {
                expect(student.student_id).toBe(6);
                expect(student.first_name).toBe("Test");
                expect(student.last_name).toBe("Student");
                expect(student.email).toBe("student12@gmail.com")
            })
    })
    test("400: responds with an error message when passed an invalid student object", () => {
        return request(app)
            .post("/api/students")
            .send({
                first_name: "Test",
                last_name: "Student",
            })
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request")
            })
    })
    test("400: responds with an error message when passed a student object with an existing email", () => {
        return request(app)
            .post("/api/students")
            .send({
                first_name: "Test",
                last_name: "Student",
                email: "student1@gmail.com",
                password: "password"
            })
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Email already exists")
            })
    })
})

describe(" PATCH /api/students/:student_id", () => {
    test("200: responds with the updated student object", () => {
        return request(app)
            .patch("/api/students/1")
            .send({
                first_name: "Updated",
                last_name: "Student",
                email: "student1@gmail.com",
                password: "password"
            })
            .expect(200)
            .then(({ body: { student } }) => {
                expect(student.student_id).toBe(1);
                expect(student.first_name).toBe("Updated");
                expect(student.last_name).toBe("Student");
                expect(student.email).toBe("student1@gmail.com")
                expect(student.password).toBe("password")
         })
    })
    test("200: responds with the updated student object when passed a student object with extra keys", () => {
        return request(app)
            .patch("/api/students/1")
            .send({
                first_name: "Updated",
                last_name: "Student",
                email: "student1@gmail.com",
                password: "password",
                extra: "key"
            })
            .expect(200)
            .then(({ body: { student } }) => {
                expect(student.student_id).toBe(1);
                expect(student.first_name).toBe("Updated");
                expect(student.last_name).toBe("Student");
                expect(student.email).toBe("student1@gmail.com")
                expect(student.password).toBe("password")
            })
    })
    test("404: responds with an error message when passed a non-existent student_id", () => {
        return request(app)
            .patch("/api/students/100")
            .send({
                first_name: "Updated",
                last_name: "Student",
                email: "student1@gmail.com",
                password: "password"
            })
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Student not found")
            })
    })
    test("400: responds with an error message when passed an invalid student_id", () => {
        return request(app)
            .patch("/api/students/invalid")
            .send({
                first_name: "Updated",
                last_name: "Student",
                email: "student1@gmail.com",
                password: "password"
            })
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request")
            })
    })
    test("400: responds with an error message when passed an invalid student object", () => {
        return request(app)
            .patch("/api/students/1")
            .send({
                first_name: "Updated",
                last_name: "Student",
            })
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request")
            })
    })
})
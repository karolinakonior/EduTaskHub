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

describe(" DELETE /api/students/:student_id", () => {
    test("204: responds with no content", () => {
        return request(app)
            .delete("/api/students/1")
            .expect(204)
    })
    test("404: responds with an error message when passed a non-existent student_id", () => {
        return request(app)
            .delete("/api/students/100")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Student not found")
            })
    })
    test("400: responds with an error message when passed an invalid student_id", () => {
        return request(app)
            .delete("/api/students/invalid")
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request")
            })
    })
})

describe("GET /api/students/:student_id/subjects", () => {
    test("200: responds with an array of subject objects", () => {
        return request(app)
            .get("/api/students/1/subjects")
            .expect(200)
            .then(({ body: { subjects } }) => {
                expect(subjects).toHaveLength(5);
                expect(subjects[0]).toEqual({
                    subject_id: 1,
                    subject_name: "Biology",
                })
            })
    })
    test("200: responds with an empty array when passed a student_id with no subjects", () => {
        return request(app)
            .get("/api/students/5/subjects")
            .expect(200)
            .then(({ body: { subjects } }) => {
                expect(subjects).toEqual([]);
            })
    })
    test("404: responds with an error message when passed a non-existent student_id", () => {
        return request(app)
            .get("/api/students/100/subjects")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Student not found")
            })
    })
    test("400: responds with an error message when passed an invalid student_id", () => {
        return request(app)
            .get("/api/students/invalid/subjects")
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request")
            })
    })
})

describe("POST /api/students/:student_id/subjects", () => {
    test("201: responds with the posted subject object", () => {
        return request(app)
            .post("/api/students/3/subjects")
            .send({
                subject_name: "Biology"
            })
            .expect(201)
            .then(({ body: { subject} }) => {
                expect(subject.student_id).toBe(3);
                expect(subject.subject_id).toBe(1);
            })
    })
    test("201: responds with the posted subject object when passed a subject object with extra keys", () => {
        return request(app)
            .post("/api/students/3/subjects")
            .send({
                subject_name: "Biology",
                extra: "key"
            })
            .expect(201)
            .then(({ body: { subject } }) => {
                expect(subject.student_id).toBe(3);
                expect(subject.subject_id).toBe(1);
            })
    })
    test("400: responds with an error message when passed an invalid subject object", () => {
        return request(app)
            .post("/api/students/3/subjects")
            .send({
                subject_name: 1
            })
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Subject not found")
            })
    })
    test("404: responds with an error message when passed a non-existent student_id", () => {
        return request(app)
            .post("/api/students/100/subjects")
            .send({
                subject_name: "Biology"
            })
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Student not found")
            })
    })
})

describe("DELETE /api/students/:student_id/subjects/:subject_id", () => {
    test("204: responds with no content", () => {
        return request(app)
            .delete("/api/students/1/subjects/1")
            .expect(204)
    })
    test("404: responds with an error message when passed a non-existent student_id", () => {
        return request(app)
            .delete("/api/students/100/subjects/1")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Student not found")
            })
    })
    test("404: responds with an error message when passed a non-existent subject_id", () => {
        return request(app)
            .delete("/api/students/1/subjects/100")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Subject not found")
            })
    })
})

describe("GET /api/students/:student_id/year", () => {
    test("200: responds with an array of year objects", () => {
        return request(app)
            .get("/api/students/1/year")
            .expect(200)
            .then(({ body: { year } }) => {
                expect(year).toHaveLength(1);
                expect(year[0]).toEqual({
                    year_id: 1,
                    year: 12,
                    student_id: 1
                })
            })
    })
    test("200: responds with an empty array when passed a student_id with no years", () => {
        return request(app)
            .get("/api/students/5/year")
            .expect(200)
            .then(({ body: { year } }) => {
                expect(year).toEqual([]);
            })
    })
    test("404: responds with an error message when passed a non-existent student_id", () => {
        return request(app)
            .get("/api/students/100/year")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Student not found")
            })
    })
    test("400: responds with an error message when passed an invalid student_id", () => {
        return request(app)
            .get("/api/students/invalid/year")
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Bad request")
            })
    })
})

describe("POST /api/students/:student_id/year", () => {
    test("201: responds with the posted year object", () => {
        return request(app)
            .post("/api/students/5/year")
            .send({
                year: 12
            })
            .expect(201)
            .then(({ body: { year } }) => {
                expect(year.student_id).toBe(5);
                expect(year.year_id).toBe(1);
            })
    })
    test("201: responds with the posted year object when passed a year object with extra keys", () => {
        return request(app)
            .post("/api/students/5/year")
            .send({
                year: 12,
                extra: "key"
            })
            .expect(201)
            .then(({ body: { year } }) => {
                expect(year.student_id).toBe(5);
                expect(year.year_id).toBe(1);
            })
    })
    test("400: responds with an error message when passed an invalid year object", () => {
        return request(app)
            .post("/api/students/5/year")
            .send({
                invalid: "12"
            })
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Year not found")
            })
    })
    test("404: responds with an error message when passed a non-existent student_id", () => {
        return request(app)
            .post("/api/students/100/year")
            .send({
                year: 12
            })
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Student not found")
            })
    })
    test("404: responds with an error message when passed year object to a student who already has a year assigned", () => {
        return request(app)
            .post("/api/students/1/year")
            .send({
                year: 12
            })
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Student already has a year")
            })
    })
})

describe("DELETE /api/students/:student_id/year/:year_id", () => {
    test("204: responds with no content", () => {
        return request(app)
            .delete("/api/students/1/year/1")
            .expect(204)
    })
    test("404: responds with an error message when passed a non-existent student_id", () => {
        return request(app)
            .delete("/api/students/100/year/1")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Student not found")
            })
    })
    test("404: responds with an error message when passed a year_id not assigned to a student", () => {
        return request(app)
            .delete("/api/students/1/year/100")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Year not found")
            })
    })
})
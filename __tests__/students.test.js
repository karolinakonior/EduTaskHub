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
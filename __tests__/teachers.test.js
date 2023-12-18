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
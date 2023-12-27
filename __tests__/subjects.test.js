const { seed } = require("../dist/db/data/seeds/seed.js");
const testData = require("../dist/db/data/test-data/index");
const db = require("../dist/db/pool.js");
const request = require("supertest");
const { app } = require("../dist/api.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/subjects", () => {
    test("200: responds with an array of subject objects", () => {
        return request(app)
            .get("/api/subjects")
            .expect(200)
            .then(({ body: { subjects } }) => {
                expect(subjects).toHaveLength(5);
                expect(subjects[0]).toEqual({
                    subject_id: 1,
                    subject_name: "Biology"
                })
            })
    })
})
const { seed } = require("../dist/db/data/seeds/seed.js");
const testData = require("../dist/db/data/test-data/index");
const db = require("../dist/db/pool.js");
const request = require("supertest");
const { app } = require("../dist/api.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/years", () => {
    test("200: responds with an array of year objects", () => {
        return request(app)
            .get("/api/years")
            .expect(200)
            .then(({ body }) => {
                expect(body.years).toHaveLength(2);
                expect(body.years[0]).toEqual({
                    year_id: 1, year: 12
                })
            })
    })
})

// test
const { seed } = require("../dist/db/data/seeds/seed.js");
const testData = require("../dist/db/data/test-data/index");
const db = require("../dist/db/pool.js");
const request = require("supertest");
const { app } = require("../dist/api.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/assignments", () => {
    test("200: responds with an array of assignment objects", async () => {
        return request(app)
            .get("/api/assignments")
            .expect(200)
            .then(({ body: { assignments } }) => {
                expect(assignments).toHaveLength(3);
                expect(assignments[0]).toEqual({
                    assignment_id: 1,
                    name: 'The effect of the concentration of salt solution on the mass of potatoes',
                    description: 'Write an essay on the effect of the concentration of salt solution on the mass of potatoes. Include a hypothesis, method, results, discussion and conclusion.',
                    due_date: "2020-11-07T00:00:00.000Z",
                    teacher_id: 1,
                    year_id: 1,
                    subject_id: 1
                })
            })
    })
})
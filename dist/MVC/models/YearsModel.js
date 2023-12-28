"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../../dist/db/pool.js");
exports.fetchYears = () => {
    return db.query(`SELECT * FROM years;`)
        .then(({ rows }) => {
        return rows;
    });
};

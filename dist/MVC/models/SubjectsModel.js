"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../../dist/db/pool.js");
exports.fetchSubjects = () => {
    return db.query("SELECT * FROM subjects")
        .then(({ rows }) => {
        return rows;
    });
};

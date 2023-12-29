"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../../dist/db/pool.js");
exports.fetchAssignments = () => {
    return db.query("SELECT * FROM assignments")
        .then((assignments) => {
        return assignments.rows;
    });
};

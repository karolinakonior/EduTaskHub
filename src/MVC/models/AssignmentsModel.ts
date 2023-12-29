const db = require("../../../dist/db/pool.js");
import { Assignment } from "../../db/data/test-data/assignments";

type AssignmentProps = {
    rows: Assignment[]
}

exports.fetchAssignments = () => {
    return db.query("SELECT * FROM assignments")
    .then((assignments: AssignmentProps) => { 
        return assignments.rows;
    })
}
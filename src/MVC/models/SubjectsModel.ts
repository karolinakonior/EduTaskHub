const db = require("../../../dist/db/pool.js");
import { Subject } from "../../db/data/test-data/subjects";

type SubjectProps = {
    rows: Subject[]
}

exports.fetchSubjects = () => {
    return db.query("SELECT * FROM subjects")
    .then(({ rows }: SubjectProps) => {
        return rows;
    })
}


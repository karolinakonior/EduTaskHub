const db = require("../../../dist/db/pool.js");
import { SubjectProps } from "../../types/SubjectProps";

exports.fetchSubjects = () => {
    return db.query("SELECT * FROM subjects")
    .then(({ rows }: SubjectProps) => {
        return rows;
    })
}


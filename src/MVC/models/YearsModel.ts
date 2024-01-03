const db = require("../../../dist/db/pool.js");
import { Year } from "../../types/Year";

type YearProps = {
    rows: Year[]
}

exports.fetchYears = () => {
    return db.query(`SELECT * FROM years;`)
    .then(({ rows }: YearProps) => {
        return rows;
    })
}
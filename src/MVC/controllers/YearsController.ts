import { Request, Response, NextFunction } from "express";
const { fetchYears } = require("../models/YearsModel");
import { Year } from "../../db/data/test-data/year";

export const getYears = (req: Request, res: Response, next: NextFunction) => {
    fetchYears()
    .then((years: Year) => {
        res.status(200).send({ years })
    })
}
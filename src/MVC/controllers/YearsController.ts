import { Request, Response, NextFunction } from "express";
const { fetchYears } = require("../models/YearsModel");
import { Year } from "../../types/Year";

export const getYears = (req: Request, res: Response, next: NextFunction) => {
    fetchYears()
    .then((years: Year) => {
        res.status(200).send({ years })
    })
}
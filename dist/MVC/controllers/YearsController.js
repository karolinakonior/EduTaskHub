"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYears = void 0;
const { fetchYears } = require("../models/YearsModel");
const getYears = (req, res, next) => {
    fetchYears()
        .then((years) => {
        res.status(200).send({ years });
    });
};
exports.getYears = getYears;

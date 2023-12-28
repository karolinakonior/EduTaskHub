export const yearsRouter = require("express").Router();
const { getYears } = require("../controllers/YearsController");

yearsRouter.route("/").get(getYears)
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const api_router_1 = require("./MVC/routers/api-router");
const { handleCustomErrors, handlePSQLErrors } = require("./errors");
const express = require("express");
const cors = require("cors");
exports.app = express();
exports.app.use(cors());
exports.app.use(express.json());
exports.app.use("/api", api_router_1.apiRouter);
exports.app.all("/*", (req, res, next) => {
    res.status(404).send({ msg: "URL not found" });
});
exports.app.use(handleCustomErrors);
exports.app.use(handlePSQLErrors);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Db_1 = require("./config/Db");
const mainApp_1 = require("./mainApp");
const app = (0, express_1.default)();
const port = 5566;
(0, mainApp_1.mainApp)(app);
const server = app.listen(port, () => {
    (0, Db_1.dataBase)();
    console.log("server is connected");
});
process.on("uncaughtException", (error) => {
    console.log(`uncaughtException: `, error);
});
process.on("unhandledRejection", (reason) => {
    console.log("unhandledRejection: ", reason);
    server.close(() => {
        process.exit(1);
    });
});

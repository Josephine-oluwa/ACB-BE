"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const giftRouter_1 = __importDefault(require("./router/giftRouter"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const mainApp = (app) => {
    app.use((0, express_1.default)());
    app.use((0, cors_1.default)()).use((0, helmet_1.default)()).use((0, morgan_1.default)("dev")),
        app.use("/api", userRouter_1.default);
    app.use("/api", giftRouter_1.default);
    app.get("/", (req, res) => {
        try {
            return res.status(201).json({
                message: "found the default Api"
            });
        }
        catch (error) {
            return res.status(404).json({
                message: "cannot find default Api",
                data: error.message
            });
        }
    });
};
exports.mainApp = mainApp;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const Router = express_1.default.Router();
Router.route("/register").post(userController_1.registerUser);
Router.route("/:token/enter-otp").post(userController_1.enterOTPUser);
Router.route("/:token/verify-user").get(userController_1.verifyUser);
Router.route("/signIn-user").post(userController_1.signInUser);
Router.route("/:id/view-one-user").get(userController_1.viewOneUser);
Router.route("/view-all-user").get(userController_1.viewAllUsers);
Router.route("/:id/delete-user").delete(userController_1.deleteUser);
exports.default = Router;

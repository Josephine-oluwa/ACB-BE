"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.viewAllUsers = exports.viewOneUser = exports.signInUser = exports.verifyUser = exports.enterOTPUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
const email_1 = require("../utils/email");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const randValue = crypto_1.default.randomBytes(10).toString("hex");
        const otp = crypto_1.default.randomBytes(3).toString("hex");
        const token = jsonwebtoken_1.default.sign(randValue, "josephine");
        const user = yield userModel_1.default.create({
            userName, email, password: hashed, token, otp, wallet: 200
        });
        (0, email_1.sendInitialMail)(user).then(() => {
            console.log("OTP has been sent");
        });
        return res.status(201).json({
            message: "almost done with registration",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error occurred during registration",
            data: error.message
        });
    }
});
exports.registerUser = registerUser;
const enterOTPUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp } = req.body;
        const { token } = req.params;
        jsonwebtoken_1.default.verify(token, "josephine", (err, payload) => __awaiter(void 0, void 0, void 0, function* () {
            if (payload) {
                const user = yield userModel_1.default.findById(payload.id);
                if ((user === null || user === void 0 ? void 0 : user.otp) === otp) {
                    (0, email_1.sendLastMail)(user).then(() => {
                        console.log("verification mail has been sent");
                    });
                    return res.status(201).json({
                        message: "please check your verification",
                        data: user
                    });
                }
                else {
                    return res.status(404).json({
                        message: "error with otp"
                    });
                }
            }
            else {
                return err;
            }
        }));
        return res;
    }
    catch (error) {
        return res.status(404).json({
            message: "Error with otp",
            data: error.message
        });
    }
});
exports.enterOTPUser = enterOTPUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        jsonwebtoken_1.default.verify(token, "josephine", (err, payload) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                throw new Error();
            }
            else {
                const user = yield userModel_1.default.findById(payload.id);
                if (user) {
                    yield userModel_1.default.findByIdAndUpdate(user.id, {
                        verified: true,
                        token: ""
                    }, { new: true });
                    return res.status(201).json({
                        message: "verification successful"
                    });
                }
                else {
                    return res.status(404).json({
                        message: " you are not authorized for this"
                    });
                }
            }
            return res;
        }));
    }
    catch (error) {
        return res.status(404).json({
            message: `Error verifying gift user`,
            data: error.message,
        });
    }
});
exports.verifyUser = verifyUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            const checkPassword = yield bcrypt_1.default.compare(password, user.password);
            if (checkPassword) {
                const token = jsonwebtoken_1.default.sign({ id: user.id }, "josephine");
                if (user.verified && user.token === "") {
                    return res.status(201).json({
                        message: "you have been verified",
                        data: token
                    });
                }
                else {
                    return res.status(404).json({
                        message: "you cannot signUp"
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: "you cannot signUp"
                });
            }
        }
        else {
            return res.status(404).json({
                message: "you cannot signUp"
            });
        }
    }
    catch (error) {
        return res.status(201).json({
            message: "successful"
        });
    }
});
exports.signInUser = signInUser;
const viewOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Id } = req.params;
        const user = yield userModel_1.default.findById(Id);
        return res.status(201).json({
            message: "all users viewed",
            data: user
        });
    }
    catch (error) {
        return res.status(201).json({
            message: "unsuccessful",
            data: error.message
        });
    }
});
exports.viewOneUser = viewOneUser;
const viewAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield userModel_1.default.find();
        return res.status(201).json({
            message: "all users viewed",
            data: all
        });
    }
    catch (error) {
        return res.status(201).json({
            message: "unsuccessful",
            data: error.message
        });
    }
});
exports.viewAllUsers = viewAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userModel_1.default.findByIdAndDelete(id);
        return res.status(201).json({
            message: "deleted now!",
            data: user
        });
    }
    catch (error) {
        return res.status(201).json({
            message: "unsuccessful",
            data: error.message
        });
    }
});
exports.deleteUser = deleteUser;

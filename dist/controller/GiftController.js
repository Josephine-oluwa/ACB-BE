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
exports.deleteHistory = exports.deleteGiftCard = exports.viewAllHistory = exports.populateHistory = exports.oneGiftCard = exports.allGiftCards = exports.populateGiftCard = exports.createGift = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const GiftModel_1 = __importDefault(require("../model/GiftModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const historyModel_1 = __importDefault(require("../model/historyModel"));
const createGift = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { giftName, giftPrice, giftDescription } = req.body;
        const { id } = req.params;
        const user = yield userModel_1.default.findById(id);
        const gifting = yield userModel_1.default.create({
            giftName,
            giftPrice,
            giftDescription,
            userID: id,
        });
        if (user) {
            user === null || user === void 0 ? void 0 : user.gift.push(new mongoose_1.default.Types.ObjectId(gifting.id));
            user === null || user === void 0 ? void 0 : user.save();
            return res.status(201).json({
                message: "successfully created gift card",
                data: gifting,
            });
        }
        else {
            return res.status(404).json({
                message: "unable to create",
            });
        }
    }
    catch (error) {
        return res.status(201).json({
            message: "cannot create giftCard",
            data: error.message,
        });
    }
});
exports.createGift = createGift;
const populateGiftCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const giftDone = yield userModel_1.default.findById(id).populate({
            path: "gift",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(201).json({
            message: "gift populated",
            data: giftDone,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error populating gift cards",
            data: error.message,
        });
    }
});
exports.populateGiftCard = populateGiftCard;
const allGiftCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allGiftCard = yield GiftModel_1.default.find().sort({
            createdAt: -1,
        });
        return res.status(201).json({
            message: "found all giftCards",
            data: allGiftCard,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error occurred while finding giftCards",
            data: error.message,
        });
    }
});
exports.allGiftCards = allGiftCards;
const oneGiftCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const giftID = req.params;
        const oneGift = yield GiftModel_1.default.findById(giftID);
        return res.status(201).json({
            message: "found all giftCards",
            data: oneGift,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error occurred while finding giftCards",
            data: error.message,
        });
    }
});
exports.oneGiftCard = oneGiftCard;
// export const buyGiftCard = async(req: Request, res: Response) => {
//     try {
//         const {amount} = req.body
//         const {id, giftID} = req.params
//         const user = await userModel.findById(id)
//         const gift = await GiftModel.findById(giftID)
//         if (user?.wallet! < amount) {
//             return res.status(201).json({
//                 message: "you can purchase"
//             })
//         } else {
//            if (gift?.purchased !== true) {
//             const history = await historyModel.create({
//                 amount,
//                 userID: id,
//                 giftName: gift?.giftName
//             });
//             if (gift?.giftPrice === amount) {
//                 const update = await GiftModel.findByIdAndUpdate(
//                     gift?.id,
//                     {
//                         bought : true
//                     },
//                     {new : true}
//                 );
//                 if () {
//                 }
//             }
//            }
//         }
//     } catch (error:any) {
//         return res.status(201).json({
//             message: "you can not  purchase"
//         })
//     }
// }
const populateHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const populateHistory = yield userModel_1.default.findById(id).populate({
            path: "history",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(201).json({
            message: "populate History",
            data: populateHistory,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error populating history",
        });
    }
});
exports.populateHistory = populateHistory;
const viewAllHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield historyModel_1.default.find();
        return res.status(201).json({
            message: "Histories found",
            data: all,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error populating history",
        });
    }
});
exports.viewAllHistory = viewAllHistory;
const deleteGiftCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { giftID, _id } = req.params;
        const gift = yield GiftModel_1.default.findById(giftID);
        const giftUser = yield userModel_1.default.findById(_id);
        if (giftUser) {
            (_a = giftUser === null || giftUser === void 0 ? void 0 : giftUser.gift) === null || _a === void 0 ? void 0 : _a.pull(new mongoose_1.default.Types.ObjectId(giftID));
            giftUser === null || giftUser === void 0 ? void 0 : giftUser.save();
            yield GiftModel_1.default.findByIdAndDelete(giftID);
        }
        return res.status(201).json({
            message: `Deleted`,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error deleting gift card",
            data: error.message,
        });
    }
});
exports.deleteGiftCard = deleteGiftCard;
const deleteHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { historyID, _id } = req.params;
        yield historyModel_1.default.findById(historyID);
        const giftUser = yield userModel_1.default.findById(_id);
        if (giftUser) {
            giftUser.history.pull(new mongoose_1.default.Types.ObjectId(historyID));
            giftUser === null || giftUser === void 0 ? void 0 : giftUser.save();
            yield historyModel_1.default.findByIdAndDelete(historyID);
        }
        return res.status(201).json({
            message: `1 Gift Card from History Deleted`,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error deleting history",
            data: error.message,
        });
    }
});
exports.deleteHistory = deleteHistory;

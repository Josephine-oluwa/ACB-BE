"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GiftController_1 = require("../controller/GiftController");
const gift = express_1.default.Router();
gift.route("/create-gift/:id").post(GiftController_1.createGift);
gift.route("/:token/populate-gift").get(GiftController_1.populateGiftCard);
gift.route("/all-gifts").get(GiftController_1.allGiftCards);
gift.route("/:id/one-gift").get(GiftController_1.oneGiftCard);
gift.route("/populate-gift").get(GiftController_1.populateHistory);
// gift.route("/:id/buy-gift").post(buyGiftCard)
gift.route("/view-histories").get(GiftController_1.viewAllHistory);
gift.route("/delete-history").delete(GiftController_1.deleteHistory);
exports.default = gift;

import express from "express";
import {
  allGiftCards,
  createGift,
  deleteHistory,
  oneGiftCard,
  populateGiftCard,
  populateHistory,
  viewAllHistory,
} from "../controller/GiftController";

const gift = express.Router();

gift.route("/create-gift/:id").post(createGift);
gift.route("/:token/populate-gift").get(populateGiftCard);
gift.route("/all-gifts").get(allGiftCards);
gift.route("/:id/one-gift").get(oneGiftCard);
gift.route("/populate-gift").get(populateHistory);
// gift.route("/:id/buy-gift").post(buyGiftCard)
gift.route("/view-histories").get(viewAllHistory);
gift.route("/delete-history").delete(deleteHistory);

export default gift;

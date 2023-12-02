import express, { Request, Response } from "express";
import userModel from "../model/userModel";
import GiftModel from "../model/GiftModel";
import mongoose from "mongoose";
import historyModel from "../model/historyModel";

export const createGift = async (req: any, res: Response) => {
  try {
    const { giftName, giftPrice, giftDescription } = req.body;
    const { id } = req.params;

    const user: any = await userModel.findById(id);
    const gifting: any = await userModel.create({
      giftName,
      giftPrice,
      giftDescription,
      userID: id,
    });

    if (user) {
      user?.gift.push(new mongoose.Types.ObjectId(gifting.id));
      user?.save();
      return res.status(201).json({
        message: "successfully created gift card",
        data: gifting,
      });
    } else {
      return res.status(404).json({
        message: "unable to create",
      });
    }
  } catch (error: any) {
    return res.status(201).json({
      message: "cannot create giftCard",
      data: error.message,
    });
  }
};

export const populateGiftCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const giftDone = await userModel.findById(id).populate({
      path: "gift",
      options: {
        sort: { createdAt: -1 },
      },
    });
    return res.status(201).json({
      message: "gift populated",
      data: giftDone,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error populating gift cards",
      data: error.message,
    });
  }
};

export const allGiftCards = async (req: Request, res: Response) => {
  try {
    const allGiftCard = await GiftModel.find().sort({
      createdAt: -1,
    });

    return res.status(201).json({
      message: "found all giftCards",
      data: allGiftCard,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error occurred while finding giftCards",
      data: error.message,
    });
  }
};

export const oneGiftCard = async (req: Request, res: Response) => {
  try {
    const giftID = req.params;
    const oneGift = await GiftModel.findById(giftID);

    return res.status(201).json({
      message: "found all giftCards",
      data: oneGift,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error occurred while finding giftCards",
      data: error.message,
    });
  }
};

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

export const populateHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const populateHistory = await userModel.findById(id).populate({
      path: "history",
      options: {
        sort: { createdAt: -1 },
      },
    });
    return res.status(201).json({
      message: "populate History",
      data: populateHistory,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error populating history",
    });
  }
};

export const viewAllHistory = async (req: Request, res: Response) => {
  try {
    const all = await historyModel.find();

    return res.status(201).json({
      message: "Histories found",
      data: all,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error populating history",
    });
  }
};

export const deleteGiftCard = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { giftID, _id } = req.params;
    const gift = await GiftModel.findById(giftID);
    const giftUser: any = await userModel.findById(_id);

    if (giftUser) {
      giftUser?.gift?.pull(new mongoose.Types.ObjectId(giftID));
      giftUser?.save();

      await GiftModel.findByIdAndDelete(giftID);
    }

    return res.status(201).json({
      message: `Deleted`,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error deleting gift card",
      data: error.message,
    });
  }
};

export const deleteHistory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { historyID, _id } = req.params;
    await historyModel.findById(historyID);
    const giftUser: any = await userModel.findById(_id);

    if (giftUser) {
      giftUser.history.pull(new mongoose.Types.ObjectId(historyID));
      giftUser?.save();

      await historyModel.findByIdAndDelete(historyID);
    }

    return res.status(201).json({
      message: `1 Gift Card from History Deleted`,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error deleting history",
      data: error.message,
    });
  }
};

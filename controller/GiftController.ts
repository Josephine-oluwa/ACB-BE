import express, {Request, Response} from "express"
import userModel from "../model/userModel"
import GiftModel from "../model/GiftModel"
import mongoose  from "mongoose"

export const createGift = async (req: any, res: Response) => {
try {
    const {giftName, giftPrice, giftDescription} = req.body
    const {id} = req.params

    const giftUser: any = await userModel.findById(id)
    const giftDone: any = await GiftModel.create({
       giftName, giftPrice, giftDescription, 
       userID: id
    })
    if (giftUser) {
        giftUser.gift.push(new mongoose.Types.ObjectId(giftDone.id));
        giftUser?.save()

        return res.status(201).json({
            message: "successfully created a gift card"
        })
    } else {
        return res.status(404).json({
            message: "problem occurred while creating gift card"
        })
    }
    
} catch (error) {
  return res.status(404).json({
    message: "error buying giftcard"
  })  
}
}

export const populateGiftCard = async (req: Request, res: Response) => {
try {
    const {id}  = req.params

    const giftDone = await userModel.findById(id).populate({
        path: "gift", 
        options: {
            sort: {createdAt: -1}
        }
    })
    return res.status(201).json({
        message: "gift populated",
        data: giftDone
    })
} catch (error) {
    return res.status(404).json({
        message: "error populating gift cards",
        data: error.message,
      });
}
}




export const allGiftCards = async (req: Request, res: Response) => {
try {
   const allGiftCard = await GiftModel.find().sort({
    createdAt: -1
   })


    return res.status(201).json({
        message: "found all giftCards",
        data: allGiftCard
    })
} catch (error) {
    return res.status(404).json({
        message: "error occurred while finding giftCards",
        data: error.message,
      });
}
}


export const oneGiftCard = async (req: Request, res: Response) => {
try {
   
    const giftID = req.params;
    const oneGift = await GiftModel.findById(giftID)

    return res.status(201).json({
        message: "found all giftCards",
       data: oneGift
    })
} catch (error) {
    return res.status(404).json({
        message: "error occurred while finding giftCards",
        data: error.message,
      });
}
}


// export const buyGiftCard = async (req: Request, res: Response) => {
// try {
   
//     const amount = req.body;
//     const {id, giftID} = req.params

//     const user = await userModel.findById(id)
//     const gift = await GiftModel.findById(giftID)

//     if (user?.wallet! < amount ) {
//         return res.status(201).json({
//             message: "you can purchase now!"
//         })
//     } else {
//         if (gift?.purchased !== true) {
//             const history = 
//         }
//     }

//     return res.status(201).json({
//         message: "found all giftCards",
     
//     })
// } catch (error) {
//     return res.status(404).json({
//         message: "error occurred while finding giftCards",
//         data: error.message,
//       });
// }
// }


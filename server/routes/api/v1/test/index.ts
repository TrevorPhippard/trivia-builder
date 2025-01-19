import express from "express";

import accountModel from "../../../../models/account.model";
import messageModel from "../../../../models/message.model";
import questionModel from "../../../../models/question.model";
import resourceModel from "../../../../models/resource.model";
import roomModel from "../../../../models/room.model";
import triviaModel from "../../../../models/trivia.model";
import userModel from "../../../../models/user.model";
import BaseController from "../../../../controllers/baseController";

const Controller = new BaseController(userModel);
const router = express.Router();



router.get("/:user_name", async (req: any, res: any) => {

    const query = {
        include: [
            {
                model: questionModel,
                as: 'User',
                // attributes: [ "user_name"],
            },
            // {
            //     model: userModel,
            //     as: 'User',
            //     attributes: [ "user_name"],
            // }
        ]
    }
    const result = await triviaModel.findAll(query)
    if (!result) {
        return res.status(404).send("item not found");
    } else {
        return res.json(result);
    }
})


// router.get("/:user_name", async (req: any, res: any) => {

//     const query = {
//         include: [
//             {
//                 model: userModel,
//                 as: 'User',
//                 attributes: [ "user_name"],
//                 include: [
//                     {
//                         model: accountModel,
//                         as: 'Accounts',
//                         attributes: [ "avatar"]
//                     },
//                 ]
//             }
//         ]
//     }
//     const result = await roomModel.findAll(query)
//     if (!result) {
//         return res.status(404).send("item not found");
//     } else {
//         return res.json(result);
//     }
// })



// router.get("/:user_name", async (req: any, res: any) => {
//     const user_acct_trivia_query = {
//         attributes: ["user_name", "email"],
//         where: { user_name: 'test' },
//         include: [
//             {
//                 model: accountModel,
//                 as: 'Accounts',
//                 attributes: ["description", "avatar"]
//             },
//             {
//                 model: triviaModel,
//                 as: 'Trivia',
//                 attributes: ["id", "owner", "trivia_name", "question_collection", "bg_bcolour", "text_colour"]
//             },
//         ]
    
//     }

//     const result = await userModel.findAll(user_acct_trivia_query)
//     if (!result) {
//         return res.status(404).send("item not found");
//     } else {
//         return res.json(result);
//     }
// })




export default router;
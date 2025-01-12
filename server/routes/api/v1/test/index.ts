import express from "express";


import accountModel from "../../../../models/account.model";
// import messageModel from "../../../../models/message.model";
// import questioncollectionModel from "../../../../models/questioncollection.model";
// import questionModel from "../../../../models/question.model";
// import resourceModel from "../../../../models/resource.model";
// import roomModel from "../../../../models/room.model";
import triviaModel from "../../../../models/trivia.model";
// import usercollectionModel from "../../../../models/usercollection.model";
import userModel from "../../../../models/user.model";
import BaseController from "../../../../controllers/baseController";

const Controller = new BaseController(userModel);
const router = express.Router();

router.get("/:user_name", async (req: any, res: any) => {

    // const user_name = req.params.user_name;
    const query = {
        attributes: ["user_name", "email"],
        where: { user_name: 'test' },
        include: [
            {
                model: accountModel,
                as: 'account',
                attributes: ["description", "avatar"]
            },
            {
                model: triviaModel,
                as: 'trivia',
                attributes: ["id", "owner", "trivia_name", "question_collection", "bg_bcolour", "text_colour"]
            },
        ]

    }

    const result = await userModel.findAll(query)
    if (!result) {
        return res.status(404).send("item not found");
    } else {
        return res.json(result);
    }
})

// router.get("/:id", async (req: any, res: any) => {
//     const result = await Controller.getEntryById(req.params.id)
//     if (!result) {
//         return res.status(404).send("item not found");
//     } else {
//         return res.json(result);
//     }
// })


// router.get("/", async (req: any, res: any) => {
//     const entries = await Controller.getAllEntries()
//     return res.json(entries);
// })

router.post("/", async (req: any, res: any) => {
    const { user_name, email, password } = req.body;
    const result = await Controller.addEntry({ user_name, email, password })
    return res.status(200).json(result);
});

router.put("/:id", async (req: any, res: any) => {
    const routeId = Number(req.params.id);
    const { id, user_name, email, password } = req.body;
    const result = await Controller.updateEntryById(routeId, { id, user_name, email, password })
    if (!result) {
        return res.status(404).send("item not found");
    } else {
        return res.json(result);
    }
})

router.delete("/:id", async (req: any, res: any) => {
    const routeId = req.params.id;
    const result = await Controller.removeEntryById(routeId);
    if (!result) {
        return res.status(404).send("item not found");
    } else {
        return res.send("item deleted successfully");
    }
});

export default router;
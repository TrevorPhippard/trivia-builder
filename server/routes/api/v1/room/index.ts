import express from "express";
import Model from "../../../../models/room.model";
import accountModel from "../../../../models/account.model";
import userModel from "../../../../models/user.model";

import BaseController from "../../../../controllers/baseController";
import { Op } from "sequelize";

const Controller = new BaseController(Model);

const router = express.Router();



router.post("/isalready", async (req: any, res: any) => {
    try {
        const already = await Controller.getEntryByQuery({
            where: {
                user_id: { [Op.eq]: req.body.user_id },
                room_id: { [Op.eq]: req.body.room_id },
            }
        })
        return res.json(already);
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.get("/", async (req: any, res: any) => {
    try {
        const entries = await Controller.getAllEntries()
        return res.json(entries);
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.post("/", async (req: any, res: any) => {
    try {
        const { socket_id, user_id, room_name } = req.body;
        const result = await Controller.addEntry({ socket_id, user_id, room_name })
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).send(error);
    }
});



router.get("/:room_id", async (req: any, res: any) => {
    // try {
        const room_id = req.params.room_id;

        const query = {
            attributes: [ "updatedAt"],
            room_name: { [Op.eq]: room_id },
            include: [
                {
                    model: userModel,
                    as: 'User',
                    attributes: [ "user_name"],
                    include: [
                        {
                            model: accountModel,
                            as: 'Accounts',
                            attributes: [ "avatar"]
                        },
                    ]
                }
            ]
        }


        const result = await Controller.getEntryByQuery(query);

        if (!result) {
            return res.status(404).send("item not found");
        } else {
            return res.json(result);
        }
    // } catch (error) {
    //     return res.status(500).send(error);
    // }
})

router.put("/:id", async (req: any, res: any) => {
    try {
        const routeId = Number(req.params.id);
        const { socket_id, user_id, room_name } = req.body;
        const result = await Controller.updateEntryById(routeId, { socket_id, user_id, room_name })
        if (!result) {
            return res.status(404).send("item not found");
        } else {
            return res.json(result);
        }
    } catch (error) {
        return res.status(500).send(error);
    }
})


router.delete("/:user_id", async (req: any, res: any) => {
    try {
        const already = await Controller.getEntryByQuery({
            where: {
                user_id: { [Op.eq]: req.params.user_id },
            }
        })
        const result = await Controller.removeEntryById(already[0].id);
        if (!result) {
            return res.status(404).send("item not found");
        } else {
            return res.send("item deleted successfully");
        }
    } catch (error) {
        return res.status(500).send(error);
    }
});


export default router;
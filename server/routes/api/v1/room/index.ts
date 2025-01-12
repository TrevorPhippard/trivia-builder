import express from "express";
import Model from "../../../../models/room.model";
import BaseController from "../../../../controllers/baseController";
import { Op } from "sequelize";

const Controller = new BaseController(Model);

const router = express.Router();



router.post("/isalready", async (req: any, res: any) => {
    // try {
    const already = await Controller.getEntryByQuery({
        where: {
            user_id: { [Op.eq]: req.body.user_id },
            room_id: { [Op.eq]: req.body.room_id },
        }
    })
    return res.json(already);
    // } catch (error) {
    //     return res.status(500).send("Internal Server Error");
    // }
})

router.get("/", async (req: any, res: any) => {
    // try {
    const entries = await Controller.getAllEntries()
    return res.json(entries);
    // } catch (error) {
    //     return res.status(500).send("Internal Server Error");
    // }
})

router.post("/", async (req: any, res: any) => {
    // try {
    const { socket_id, owner, user_collection } = req.body;
    const result = await Controller.addEntry({ socket_id, owner, user_collection })
    return res.status(200).json(result);
    // } catch (error) {
    //     return res.status(500).send("Internal Server Error");
    // }
});



router.get("/:room_id", async (req: any, res: any) => {
    // try {
    const room_id = req.params.room_id;
    const result = await Controller.getEntryByQuery({
        where: {
            room_id: { [Op.eq]: room_id },
        },
    })

    if (!result) {
        return res.status(404).send("item not found");
    } else {
        return res.json(result);
    }
    // } catch (error) {
    //     return res.status(500).send("Internal Server Error");
    // }
})

router.put("/:id", async (req: any, res: any) => {
    // try {
    const routeId = Number(req.params.id);
    const { socket_id, owner, user_collection } = req.body;
    const result = await Controller.updateEntryById(routeId, { socket_id, owner, user_collection })
    if (!result) {
        return res.status(404).send("item not found");
    } else {
        return res.json(result);
    }
    // } catch (error) {
    //     return res.status(500).send("Internal Server Error");
    // }
})


router.delete("/:id", async (req: any, res: any) => {
    // try {
    const routeId = req.params.id;
    const result = await Controller.removeEntryById(routeId);
    if (!result) {
        return res.status(404).send("item not found");
    } else {
        return res.send("item deleted successfully");
    }
    // } catch (error) {
    //     return res.status(500).send("Internal Server Error");
    // }
});


export default router;
import express from "express";
import Model from "../../../../models/message.model";
import BaseController from "../../../../controllers/baseController";
import { Op } from "sequelize";

const Controller = new BaseController(Model);

const router = express.Router();

router.get("/", async (req: any, res: any) => {
    try {
    const entries = await Controller.getAllEntries()
    return res.json(entries);
    } catch (error) {
        return res.status(500).send(error);
    }
})
router.get("/:room_id", async (req: any, res: any) => {
    try {
    const room_id = req.params.room_id;
    const result = await Controller.getEntryByQuery({
        where: { room_id: { [Op.eq]: room_id }, },
    })
    if (!result) {
        return false
    } else {
        return res.json(result);
    }
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.post("/", async (req: any, res: any) => {
    try {
    const { room_id, body_text, user_id } = req.body;
    const result = await Controller.addEntry({ room_id, body_text, user_id })
    return res.status(200).json(result);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.put("/:id", async (req: any, res: any) => {
    try {
    const routeId = Number(req.params.id);
    const { room_id, body_text, user_id } = req.body;
    const result = await Controller.updateEntryById(routeId, { room_id, body_text, user_id })
    if (!result) {
        return res.status(404).send("item not found");
    } else {
        return res.json(result);
    }
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.delete("/:id", async (req: any, res: any) => {
    try {
    const routeId = req.params.id;
    const result = await Controller.removeEntryById(routeId);
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
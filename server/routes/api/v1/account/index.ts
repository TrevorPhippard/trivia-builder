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
    } catch (_error) {
        const error = (_error as Error);
        return res.status(500).send(error);
    }
})

router.post("/", async (req: any, res: any) => {
    try {
        const { user_name, room_id, message_body } = req.body;
        const result = await Controller.addEntry({ user_name, room_id, message_body })
        return res.status(200).json(result);
    } catch (_error) {
        const error = (_error as Error);
        return res.status(500).send(error);
    }
});

router.get("/:acct_id", async (req: any, res: any) => {
    try {
        const acct_id = req.params.acct_id;
        const result = await Controller.getEntryByQuery({
            where: { acct_id: { [Op.eq]: acct_id }, },
        })
        if (!result) {
            return false
        } else {
            return res.json(result);
        }
    } catch (_error) {
        const error = (_error as Error);
        return res.status(500).send(error);
    }
})

router.put("/:id", async (req: any, res: any) => {
    try {
        const routeId = Number(req.params.id);
        const { id, user_name, room_id, message_body } = req.body;
        const result = await Controller.updateEntryById(routeId, { id, user_name, room_id, message_body })
        if (!result) {
            return res.status(404).send("item not found");
        } else {
            return res.json(result);
        }
    } catch (_error) {
        const error = (_error as Error);
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
    } catch (_error) {
        const error = (_error as Error);
        return res.status(500).send(error);
    }
});

export default router;
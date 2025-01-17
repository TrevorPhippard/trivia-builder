import express from "express";
import Model from "../../../../models/trivia.model";
import BaseController from "../../../../controllers/baseController";

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

router.post("/", async (req: any, res: any) => {
    try {
    const { owner, trivia_name, question_collection, bg_bcolour, text_colour } = req.body;
    const result = await Controller.addEntry({ owner, trivia_name, question_collection, bg_bcolour, text_colour })
    return res.status(200).json(result);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get("/:id", async (req: any, res: any) => {
    try {
    const id = req.params.id;
    const result = await Controller.getEntryById(id)
    if (!result) {
        return res.status(404).send("item not found");
    } else {
        return res.json(result);
    }
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.put("/:id", async (req: any, res: any) => {
    try {
    const routeId = Number(req.params.id);
    const { owner, trivia_name, question_collection, bg_bcolour, text_colour } = req.body;
    const result = await Controller.updateEntryById(routeId, { owner, trivia_name, question_collection, bg_bcolour, text_colour })
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
    const resultingList = await Controller.getAllEntries();

    if (!result) {
        return res.status(404).send("item not found");
    } else {
        const response = {
            message: "item deleted successfully",
            entries: resultingList
        }

        return res.send(response);
    }
    } catch (error) {
        return res.status(500).send(error);
    }
});

export default router;
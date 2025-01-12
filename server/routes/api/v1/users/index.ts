import express from "express";
import Model from "../../../../models/user.model";
import BaseController from "../../../../controllers/baseController";

const Controller = new BaseController(Model);

const router = express.Router();

router.get("/", async (req:any, res:any) => {
    // try {
        const entries = await Controller.getAllEntries()
        return res.json(entries);
    // } catch (error) {
    //     return res.status(500).send("Internal Server Error");
    // }
})

router.post("/", async (req:any, res:any) => {
    // try {
        const { user_name, email, password } = req.body;
        const result = await Controller.addEntry({ user_name, email, password })
        return res.status(200).json(result);
    // } catch (error) {
    //     return res.status(500).send("Internal Server Error");
    // }
});



router.get("/:id", async (req:any, res:any) => {
    // try {
        const result = await Controller.getEntryById(req.params.id)
        if (!result) {
            return res.status(404).send("item not found");
        } else {
            return res.json(result);
        }
    // } catch (error) {
    //     return res.status(500).send("Internal Server Error");
    // }
})

router.get("/:id", async (req:any, res:any) => {

    // try {
        const result = await Controller.getEntryByQuery(req.params.id)
        if (!result) {
            return res.status(404).send("item not found");
        } else {
            return res.json(result);
        }
    // } catch (error) {
    //     return res.status(500).send("Internal Server Error");
    // }
})


router.put("/:id", async (req:any, res:any) => {
    // try {
        const routeId = Number(req.params.id);
        const { id, user_name, email, password } = req.body;
        const result = await Controller.updateEntryById(routeId, { id, user_name, email, password })
        if (!result) {
            return res.status(404).send("item not found");
        } else {
            return res.json(result);
        }
    // } catch (error) {
    //     return res.status(500).send("Internal Server Error");
    // }
})


router.delete("/:id", async (req:any, res:any) => {
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
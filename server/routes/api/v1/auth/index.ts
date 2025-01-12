import express from "express";
import { registerUser, signInUser } from "../../../../controllers/userController";

const router = express.Router();

router.post("/signup", async (req: any, res: any) => {
    // try {
    const { account_id, user_name, email, password } = req.body;
    const result = await registerUser(account_id, user_name, email, password);
    if (result.status == 400) {
        return res.send(result.message);
    } else {
        return res.json({
            id: result.message,
            message: "user succewssfully created"
        });
    }
    // } catch (err) {
    //     return res.status(500).send("Registration error");
    // }
});

router.post("/signin", async (req: any, res: any) => {
    // try {
    const { email, password } = req.body;
    const result = await signInUser(email, password);

    if (result.status == 400) {
        return res.status(result.status).send(result.message);
    } else {
        return res.header("auth-token", result.token).send(result);
    }
    // } catch (err) {
    //     return res.status(500).send("Sign in error");
    // }
});

export default router;
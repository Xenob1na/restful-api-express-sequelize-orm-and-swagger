import { Router } from "express";

import {
    registerUser,
    signInUser,
    logoutUser
} from "../controller/user.controller";

const router = Router();

router.post("/register", registerUser);

router.post("/login", signInUser);

router.get("/logout", logoutUser);

export default router;
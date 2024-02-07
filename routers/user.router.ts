import { Router } from "express";

import {
    registerUser,
    signInUser,
} from "../controller/user.controller";

const router = Router();

router.post("/register", registerUser);

router.post("/login", signInUser);

export default router;
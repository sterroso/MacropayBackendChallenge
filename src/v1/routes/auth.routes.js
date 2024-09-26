import { Router } from "express";

import { login } from "../controllers/auth.controller.js";
import { createUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", createUser);

router.post("/login", login);

export default router;

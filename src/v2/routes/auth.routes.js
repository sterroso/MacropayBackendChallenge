import { Router } from "express";

import { login } from "../controllers/auth.controller.js";
import { createUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/login", login);

router.post("/register", createUser);

export default router;

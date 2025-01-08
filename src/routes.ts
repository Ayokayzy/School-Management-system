import { Router } from "express";

import authRouter from "./features/auth/route";
import userRouter from "./features/user/route";
import classRouter from "./features/class/route";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/class", classRouter);

export default router;

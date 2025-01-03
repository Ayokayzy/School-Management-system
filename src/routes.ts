import { Router } from "express";

import authRouter from "./features/auth/route";
import userRouter from "./features/user/route";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;

import { Router } from "express";

import {
  fetchUser,
  getUserById,
  updateProfile,
  uploadProfilePicture,
  deactivateAccount,
  fetchAllUsers,
} from "./controller";
import authenticator from "../../middleware/authenticator";
import validator from "../../middleware/validator";
import { idValidator } from "../../utilities/helpers";
import { createUserValidator, updateUserValidator } from "./validator";
import { parser } from "../../middleware/file-handler";
import validateAdmin from "../../middleware/validateAdmin";
import { signup } from "../auth/controller";

const router = Router();

router.get("/all", authenticator, validateAdmin, fetchAllUsers);
router.get("/:_id", idValidator("_id"), validator, getUserById);
router.get("/", authenticator, fetchUser);
router.put("/", updateUserValidator, validator, authenticator, updateProfile);
router.post("/", createUserValidator, validator, authenticator, signup);
router.post(
  "/upload",
  parser.single("image"),
  authenticator,
  uploadProfilePicture
);
router.delete("/", authenticator, deactivateAccount);

export default router;

import { Router } from "express";
import authenticator from "../../middleware/authenticator";
import {
  createClass,
  deleteClass,
  getClass,
  getClassById,
  updateClass,
} from "./controller";
/**
 * Assign/remove student to class
 * Assign/remove Teacher for a class
 * create/update/delete class
 */

const router = Router();

router.route("/").post(authenticator, createClass).get(authenticator, getClass);

router
  .route("/:id")
  .get(authenticator, getClassById)
  .put(authenticator, updateClass)
  .delete(authenticator, deleteClass);

export default router;

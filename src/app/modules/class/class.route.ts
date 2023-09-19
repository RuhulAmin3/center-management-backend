import express from "express";
import { classController } from "./class.controller";
const router = express.Router();

router.post("/", classController.addNewClass);
router.get("/", classController.getAllClasses);
router.get("/:className", classController.getsingleClass);
router.delete("/:className", classController.deleteClass);
router.patch("/:className", classController.updateClass);

export default router;

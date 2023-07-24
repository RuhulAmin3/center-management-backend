import { teacherController } from "./teacher.controller";
import express from "express";
const router = express.Router();

router.get("/", teacherController.getAllTeacher);
router.get("/:id", teacherController.getSingleTeacher);
router.patch("/:id", teacherController.updateTeacher);
router.delete("/:id", teacherController.deleteTeacher);

export default router;

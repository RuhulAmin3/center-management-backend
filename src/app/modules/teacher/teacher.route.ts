import { validationRequest } from "../../middlewares/validationRequest";
import { teacherController } from "./teacher.controller";
import express from "express";
import { teacherValidation } from "./teacher.validation";
const router = express.Router();

router.get("/:id", teacherController.getSingleTeacher);

router.patch(
  "/:id",
  validationRequest(teacherValidation.updateTeacherZodSchema),
  teacherController.updateTeacher
);

router.delete("/:id", teacherController.deleteTeacher);

router.get("/", teacherController.getAllTeacher);

export default router;

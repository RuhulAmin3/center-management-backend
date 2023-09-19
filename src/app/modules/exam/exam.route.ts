import express from "express";
import { examController } from "./exam.controller";
import { examValidation } from "./exam.validation";
import { validationRequest } from "../../middlewares/validationRequest";

const router = express.Router();

router.post(
  "/",
  validationRequest(examValidation.createExamZodSchema),
  examController.createExam
);

router.get("/:id", examController.getExam);
router.patch(
  "/:id",
  validationRequest(examValidation.updateExamZodSchema),
  examController.updateExam
);
router.delete("/:id", examController.deleteExam);
router.delete("/result/:id", examController.deleteExamWithExamResult);

router.get("/", examController.getAllExam);

export default router;

import express from "express";
import { studentController } from "./student.controller";
import { validationRequest } from "../../middlewares/validationRequest";
import { studentValidation } from "./student.validation";
import { authValidation } from "../../middlewares/authValidation";
import { USER_ROLE } from "../../../enums/userEnum";
const router = express.Router();

router.get("/:id", studentController.getStudent);
router.patch(
  "/:id",
  validationRequest(studentValidation.updateStudentZodSchema),
  studentController.updateStudent
);

router.delete(
  "/:id",
  //   authValidation(USER_ROLE.ADMIN),
  studentController.deleteStudent
);
router.get("/", studentController.getAllStudent);

// exam result routes
// router.patch("/exam-result", studentController.addExamResult);
// router.patch("/exam-result/:id", studentController.deleteExamResult);

export default router;

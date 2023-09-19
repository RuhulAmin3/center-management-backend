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
  authValidation(USER_ROLE.ADMIN),
  studentController.deleteStudent
);
router.get("/", studentController.getAllStudent);

// exam result routes
router.patch(
  // add exam result route
  "/result/:id",
  validationRequest(studentValidation.addExamResultZodSchema),
  studentController.addExamResult
);

router.patch(
  // delete exam result route
  "/delete-result/:id",
  validationRequest(studentValidation.deleteExamResultZodSchema),
  studentController.deleteExamResult
);

// transaction history routes
router.patch(
  // add transaction route
  "/transaction/:id",
  validationRequest(studentValidation.addTransactionZodSchema),
  studentController.addTransaction
);

router.patch(
  // there have some issue in service layer
  "/update-transaction/:id",
  validationRequest(studentValidation.updateTransactionZodSchema),
  studentController.updateTransaction
);

router.patch(
  // delete transaction route
  "/delete-transaction/:id",
  validationRequest(studentValidation.deleteTransactionZodSchema),
  studentController.deleteTransaction
);

export default router;

import { USER_ROLE } from "../../../enums/userEnum";
import { authValidation } from "../../middlewares/authValidation";
import { validationRequest } from "../../middlewares/validationRequest";
import { userController } from "./user.controller";
import express from "express";
import {
  createGuardianZodSchema,
  createStudentZodSchema,
  createTeacherZodSchema,
} from "./user.validation";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);

router.post(
  "/create-student",
  authValidation(USER_ROLE.STUDENT),
  validationRequest(createStudentZodSchema),
  userController.createStudent
);

router.post(
  "/create-teacher",
  authValidation(USER_ROLE.ADMIN),
  validationRequest(createTeacherZodSchema),
  userController.createTeacher
);

router.post(
  "/create-guardian",
  authValidation(USER_ROLE.ADMIN),
  validationRequest(createGuardianZodSchema),
  userController.createGuardian
);

export default router;

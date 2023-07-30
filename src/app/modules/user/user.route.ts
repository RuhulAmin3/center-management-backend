// import { USER_ROLE } from "../../../enums/userEnum";
// import { authValidation } from "../../middlewares/authValidation";
import { validationRequest } from "../../middlewares/validationRequest";
import { userController } from "./user.controller";
import express from "express";
import { createStudentZodSchema } from "./user.validation";
const router = express.Router();

router.post(
  "/create-student",
  validationRequest(createStudentZodSchema),
  userController.createStudent
);
router.post(
  "/create-teacher",
  // authValidation(USER_ROLE.ADMIN),
  userController.createTeacher
);

export default router;

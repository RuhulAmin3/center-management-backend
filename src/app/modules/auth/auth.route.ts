import express from "express";
import { authController } from "./auth.controller";
import { authValidation } from "../../middlewares/authValidation";
import { USER_ROLE } from "../../../enums/userEnum";
import { validationRequest } from "../../middlewares/validationRequest";
import { AuthValidation } from "./auth.validation";
const router = express.Router();

router.post(
  "/login",
  validationRequest(AuthValidation.loginZodSchema),
  authController.loginUser
);

router.post(
  "/change-password",
  validationRequest(AuthValidation.changePasswordZodSchema),
  authValidation(
    USER_ROLE.ADMIN,
    USER_ROLE.GUARDIAN,
    USER_ROLE.STUDENT,
    USER_ROLE.TEACHER
  ),
  authController.changePassword
);

router.post(
  "/refresh-token",
  validationRequest(AuthValidation.refreshTokenZodSchema),
  authController.refreshToken
);

export const authRoutes = router;

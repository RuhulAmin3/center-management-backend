import { USER_ROLE } from "../../../enums/userEnum";
import { authValidation } from "../../middlewares/authValidation";
import { userController } from "./user.controller";
import express from "express";
const router = express.Router();

router.post("/create-student", userController.createStudent);
router.post(
  "/create-teacher",
  // authValidation(USER_ROLE.ADMIN),
  userController.createTeacher
);

export default router;

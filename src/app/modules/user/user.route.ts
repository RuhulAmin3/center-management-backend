import { USER_ROLE } from "../../../enums/userEnum";

import { userController } from "./user.controller";
import express, { NextFunction, Request, Response } from "express";
import {
  createGuardianZodSchema,
  createStudentZodSchema,
  createTeacherZodSchema,
} from "./user.validation";
import { ImageUploader } from "../../../shared/ImageUploader";
import { authValidation } from "../../middlewares/authValidation";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);

router.post(
  "/create-student",
  authValidation(USER_ROLE.ADMIN),
  ImageUploader.upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = createStudentZodSchema.parse(JSON.parse(req.body.data));
    return userController.createStudent(req, res, next);
  }
);

router.post(
  "/create-teacher",
  // authValidation(USER_ROLE.ADMIN),
  ImageUploader.upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = createTeacherZodSchema.parse(JSON.parse(req.body.data));
    return userController.createTeacher(req, res, next);
  }
);

router.post(
  "/create-guardian",
  // authValidation(USER_ROLE.ADMIN),
  ImageUploader.upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = createGuardianZodSchema.parse(JSON.parse(req.body.data));
    return userController.createGuardian(req, res, next);
  }
);

export default router;

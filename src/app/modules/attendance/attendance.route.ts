import express from "express";
import { validationRequest } from "../../middlewares/validationRequest";
import { attendanceValidation } from "./attendance.validation";
import { attendanceController } from "./attendance.contoller";
const router = express.Router();

router.post(
  "/",
  validationRequest(attendanceValidation.createAttendanceZodSchema),
  attendanceController.createAttendance
);

router.get("/:id", attendanceController.getAttendance);

router.get("/student/:id", attendanceController.getSingleStudentAttendance);

router.patch(
  "/:id",
  validationRequest(attendanceValidation.updateAttendanceZodSchema),
  attendanceController.updateAttendance
);
router.delete("/:id", attendanceController.deleteAttendance);

router.get("/", attendanceController.getAllAttendance);

export default router;

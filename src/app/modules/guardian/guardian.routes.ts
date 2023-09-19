import express from "express";
import { guardianController } from "./guardian.controller";
import { validationRequest } from "../../middlewares/validationRequest";
import { guardianValidation } from "./guardian.validation";
const router = express.Router();

router.get("/", guardianController.getAllGuardian);

router.get("/:id", guardianController.getSingleGuardian);

router.patch(
  "/:id",
  validationRequest(guardianValidation.updateGuardianZodSchema),
  guardianController.updateGuardian
);

router.patch(
  "/status/:id",
  validationRequest(guardianValidation.updateGuardianZodSchema),
  guardianController.approvedOrRejectAccount
);

router.delete("/:id", guardianController.deleteGuardian);

export default router;

import express from "express";
import { expenseController } from "./expense.controller";
import { validationRequest } from "../../middlewares/validationRequest";
import { expenseValidation } from "./expense.validation";
const router = express.Router();

router.post(
  "/",
  validationRequest(expenseValidation.createExpenseZodSchema),
  expenseController.createExpense
);
router.get("/:id", expenseController.getSingleExpense);
router.patch(
  "/:id",
  validationRequest(expenseValidation.updateExpenseZodSchema),
  expenseController.updateExpense
);
router.delete("/:id", expenseController.deleteExpense);
router.get("/", expenseController.getAllExpenses);

export default router;

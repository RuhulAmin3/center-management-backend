import express from "express";
import userRoutes from "../app/modules/user/user.route";
import teacherRoutes from "../app/modules/teacher/teacher.route";
import examRoutes from "../app/modules/exam/exam.route";
import studentRoutes from "../app/modules/student/student.route";
import classRoutes from "../app/modules/class/class.route";
import expenseRoutes from "../app/modules/expense/expense.route";
import attendanceRoutes from "../app/modules/attendance/attendance.route";
import guardianRoutes from "../app/modules/guardian/guardian.routes";
import { authRoutes } from "../app/modules/auth/auth.route";

const router = express.Router();

const routes = [
  { path: "/user", route: userRoutes },
  { path: "/teacher", route: teacherRoutes },
  { path: "/exam", route: examRoutes },
  { path: "/student", route: studentRoutes },
  { path: "/class", route: classRoutes },
  { path: "/expense", route: expenseRoutes },
  { path: "/attendance", route: attendanceRoutes },
  { path: "/guardian", route: guardianRoutes },
  { path: "/auth", route: authRoutes },
]; // here routes will be appened

routes.forEach((route) => router.use(route.path, route.route));

export default router;

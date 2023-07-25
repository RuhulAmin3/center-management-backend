import express from "express";
import userRoutes from "../app/modules/user/user.route";
import teacherRoutes from "../app/modules/teacher/teacher.route";
import examRoutes from "../app/modules/exam/exam.route";
const router = express.Router();

const routes = [
  { path: "/user", route: userRoutes },
  { path: "/teacher", route: teacherRoutes },
  { path: "/exam", route: examRoutes },
]; // here your routes will be appened

routes.forEach((route) => router.use(route.path, route.route));

export default router;

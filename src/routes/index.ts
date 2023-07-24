import express from "express";
import userRoutes from "../app/modules/user/user.route";
import teacherRoutes from "../app/modules/teacher/teacher.route";
const router = express.Router();

const routes = [
  { path: "/user", route: userRoutes },
  { path: "/teacher", route: teacherRoutes },
]; // here your routes will be appened

routes.forEach((route) => router.use(route.path, route.route));

export default router;

import express from "express";
const router = express.Router();

const routes = [{ path: "/", route: () => {} }]; // here your routes will be appened

routes.forEach((route) => router.use(route.path, route.route));

export default router;

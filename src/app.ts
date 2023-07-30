import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import cookiParser from "cookie-parser";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import httpStatus from "http-status";
export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookiParser());
app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("In the name of Allah.");
});

// handle not found api request using app.all methods

// app.all("*", (req, res, next) => {
//   const err = new ApiError(
//     httpStatus.NOT_FOUND,
//     `Can't find ${req.originalUrl} on this server!`
//   );
//   next(err);
// });

app.use(globalErrorHandler);

// handle not found api request using middleware(you can choose one of both)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    message: `cannot find ${req.originalUrl} on the server`,
  });
  next();
});

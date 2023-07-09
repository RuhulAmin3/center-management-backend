import express, { Request, Response } from "express";

export const app = express();
const port = process.env.PORT || 5000;
app.get("/", (req: Request, res: Response) => {
  res.send("in the name of Allah");
});

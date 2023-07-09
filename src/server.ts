import mongoose from "mongoose";
import { app } from "./app";
import config from "./config";

const port = config.port || 5000;
async function connectDb() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    console.log("database connected successfully");
    app.listen(port, () => {
      console.log(`server is running on ${port}`);
    });
  } catch (err) {
    console.log("database connection failed", err);
  }
}

connectDb();

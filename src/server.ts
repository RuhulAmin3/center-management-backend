import mongoose from "mongoose";
import { app } from "./app";
import config from "./config/index";
import { Server } from "http";

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

let server: Server;
async function connectDb() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    console.log("database connected successfully");
    server = app.listen(config.port, () => {
      console.log("server running on port", config.port);
    });
  } catch (err) {
    console.error("failed to connect database");
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

connectDb();

process.on("SIGTERM", (err) => {
  console.log("SIGTERM is received", err);
  if (server) {
    server.close();
  }
});

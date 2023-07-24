import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_DEV,
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT,
  student_pass: process.env.STUDENT_PASS,
  teacher_pass: process.env.TEACHER_PASS,
};

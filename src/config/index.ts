import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_DEV,
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT,
  student_pass: process.env.STUDENT_PASS,
  teacher_pass: process.env.TEACHER_PASS,
  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    access_expire_time: process.env.JWT_ACCESS_EXPIRE_TIME,
    refresh_expire_time: process.env.JWT_REFRESH_EXPIRE_TIME,
  },
};

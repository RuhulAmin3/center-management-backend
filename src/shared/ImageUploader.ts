import multer from "multer";
import * as fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import config from "../config";
import { IFile } from "../types/file";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

const uploadToCloudinary = async (file: IFile) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, function (error, result) {
      fs.unlinkSync(file.path);
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export const ImageUploader = {
  upload,
  uploadToCloudinary,
};

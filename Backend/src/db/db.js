import mongoose from "mongoose";
import { config } from "../config/config.js";

mongoose.set("strictQuery", false);

const connectDb = async () => {
  return new Promise((resolve, reject) => {
    const DB_URL = config.mongo.url;
    mongoose
      .connect(DB_URL)
      .then(() => resolve({ message: "DB connected successfully" }))
      .catch(() => reject({ message: "DB connection failed" }));
  });
};
export default connectDb;

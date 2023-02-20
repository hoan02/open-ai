import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

// MongoDB
export const connectDB = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Kết nối tới MongoDB thành công");
    })
    .catch((err) => {
      console.error("Kết nối tới MongoDB thất bại", err);
    });
};

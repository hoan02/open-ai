import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import { connectDB } from "./mongodb/connect.js";
import chatgptRoutes from "./routes/chatgptRoutes.js";

dotenv.config();

const PORT = 8080;

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/chatgpt", chatgptRoutes);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () =>
      console.log(`Server started on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();

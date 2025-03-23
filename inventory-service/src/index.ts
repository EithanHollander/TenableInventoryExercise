import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDB } from "./utils/connectToDB";
import productRoutes from "./routes/productsRoutes";

dotenv.config();
const PORT = process.env.PORT || 5001;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/inventory";

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use("/api/v1/products", productRoutes); // Mount the routes

connectToDB(MONGO_URI).then(() =>
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
);

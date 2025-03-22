import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { connectToDB } from "../utils/connectToDB";
import { Product, ProductModel } from "../models/Product";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/inventory";

const seedDB = async () => {
  await connectToDB(MONGO_URI);

  // Clear existing data if reset flag is set
  if (process.argv.includes("--reset")) {
    console.log("Resetting database...");
    await ProductModel.deleteMany({});
  }

  const dataPath = path.join(__dirname, "..", "data");
  const files = fs.readdirSync(dataPath);

  for (const file of files) {
    if (file.endsWith(".json")) {
      const filePath = path.join(dataPath, file);
      const jsonData = JSON.parse(
        fs.readFileSync(filePath, "utf-8")
      ) as Product[];
      await ProductModel.insertMany(
        jsonData.map(({ id, ...product }) => product)
      );
      console.log(`Inserted data from ${file}`);
    }
  }

  console.log("Database seeding completed.");
  process.exit();
};

seedDB();

import express from "express";
import mongoose from "mongoose";
import comicsRouter from "./routes/index.js";
import comicBook from "./model/ComicBook.js";
import fs from "fs/promises";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Testing the server");
});

// routes for API management
app.use("/api/data", comicsRouter);

//The MongoDB connection URL should be added to the .env file since this is an assignment task; not doing so
const uri = `mongodb+srv://krishnadevv12:4uH6xnz31N9U32T3@cluster0.aq4fl.mongodb.net/comicDb`;

// Mongodb connection setup
const Connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDb Connected Successfully");

    // Inserting Data into DB Collection
    try {
      // If there is existing data in the collection, then skip uploading new data
      const dataExists = await comicBook.find();
      if (dataExists.length === 0) {
        console.log("Uploading JSON Data to mongodb");

        // Reading comicBooks.json file from data folder using fs library for dummy data
        const jsonData = JSON.parse(
          await fs.readFile("./data/comicBooks.json", "utf-8")
        );

        const dataInserted = await comicBook.insertMany(jsonData);
        if (dataInserted) {
          console.log("Data Inserted Successfully");
        }
      }
    } catch (error) {
      console.log(`Error inserting Data`, error);
    }
  } catch (error) {
    console.error("MongoDb connection failed", error);
  }
};

Connect();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

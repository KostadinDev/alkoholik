import dotenv from "dotenv";
import http from 'http';
import app from './app.js';
import mongoose from "mongoose";
import process from "process";

dotenv.config(); // Load environment variables
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8000;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const server = http.createServer(app);

async function startServer() {
  // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
  await mongoose.connect(MONGO_URI, clientOptions);
  await mongoose.connection.db.admin().command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
  server.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
}

startServer()
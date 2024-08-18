import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import drinkRouter from "./routes/drink.router.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config(); // Load environment variables

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(morgan("dev"));


// Use the drink routes
app.use(authRouter);
app.use('/api', drinkRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;

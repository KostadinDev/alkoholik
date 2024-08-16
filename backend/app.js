import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

dotenv.config(); // Load environment variables

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/data', (req, res) => {
  const data = req.body;
  res.json({ received: data });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;

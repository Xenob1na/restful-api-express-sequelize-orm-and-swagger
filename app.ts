import express from "express";
import "dotenv/config";

import cors from "cors";

import connection from "./database/db";
import { json, urlencoded } from "body-parser";

import userRouter from "./routers/user.router";

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api/v1/users', userRouter);

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

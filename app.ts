import express from "express";
import "dotenv/config";

import cors from "cors";

import connection from "./database/db";
import { json, urlencoded } from "body-parser";

import userRouter from "./routers/user.router";
import blogRouter from "./routers/blog.router";


import session from "express-session";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})

// const fs = require("fs")
// const YAML = require('yaml')
// const swaggerUi = require('swagger-ui-express');
// const FileAuth  = fs.readFileSync('./swagger.yaml', 'utf8')
// const swaggerDocument = YAML.parse(FileAuth)

const app = express();



app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(limiter);


app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, sameSite: "strict", maxAge: 24 * 60 * 60 * 1000, httpOnly: true },
}))
app.use(helmet());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

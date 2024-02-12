import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";
import { Blog } from "../models/blog.model";

import "dotenv/config";

const connection = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: true,
  models: [User, Blog],
});

export default connection;

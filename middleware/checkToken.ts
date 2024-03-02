import jwt, { Secret } from "jsonwebtoken";
import { RequestHandler } from "express";

export const verifyToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "secret", (err, decodedToken) => {
      if (err) return res.status(403).json("Token is not valid!");
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};
import { RequestHandler } from "express";

import { Blog } from "../models/blog.model";

export const createBlog: RequestHandler = async (req, res) => {
  let blogs = await Blog.create({ ...req.body });
  return res
    .status(200)
    .json({ message: "Blog created successfully", data: blogs });
};

export const deleteBlog: RequestHandler = async (req, res) => {
  const { id } = req.body;

  const blog = await Blog.findOne({ where: { id } });
  return res
    .status(200)
    .json({ message: "Blog deleted successfully", data: blog });
};

export const getAllBlogs: RequestHandler = async (req, res) => {
  const allBlogs: Blog[] = await Blog.findAll();
  return res.status(200).json({ message: "All blogs", data: allBlogs });
};

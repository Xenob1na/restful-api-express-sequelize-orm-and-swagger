import { RequestHandler } from "express";

import { Blog } from "../models/blog.model";

export const createBlog: RequestHandler = async (req, res) => {
  try {
    let blogs = await Blog.create({ ...req.body });
    return res
      .status(200)
      .json({ message: "Blog created successfully", data: blogs });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;

    const blog = await Blog.findOne({ where: { id } });
    return res
      .status(200)
      .json({ message: "Blog deleted successfully", data: blog });
  } catch (error) {
    console.log(error);
  }
};

export const getAllBlogs: RequestHandler = async (req, res) => {
  try {
    const allBlogs: Blog[] = await Blog.findAll();
    return res.status(200).json({ message: "All blogs", data: allBlogs });
  } catch (error) {
    console.log(error);
  }
};

export const getBlogById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const blogs: Blog | null = await Blog.findByPk(id);

    return res.status(200).json({ message: "Blog", data: blogs });
  } catch (error) {
    console.log(error);
  }
};

export const updateBlog: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await Blog.update({ ...req.body }, { where: { id } });

    const updateBlogs: Blog | null = await Blog.findByPk(id);

    return res.status(200).json({ message: "Blog Update", data: updateBlogs });
  } catch (error) {
    console.log(error);
  }
};

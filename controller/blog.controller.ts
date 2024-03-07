import { RequestHandler } from "express";

import { Blog } from "../models/blog.model";
import { parse } from "path";

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
    const { id } = req.params;

    await Blog.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllBlogs: RequestHandler = async (req, res) => {
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number = parseInt(req.query.limit as string) || 4;
  let allBlogs;
  try {
    if (page && limit) {
      allBlogs = await Blog.findAndCountAll({
        offset: (page - 1) * limit,
        limit: limit,
      });
    } else {
      allBlogs = await Blog.findAll();
    }

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

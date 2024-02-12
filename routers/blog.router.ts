import { Router } from "express";

import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controller/blog.controller";

const router = Router();

router.get("/Blogs", getAllBlogs);
router.get("/Blogs/:id", getBlogById);
router.post("/Blogs", createBlog);
router.put("/Blogs/:id", updateBlog);
router.delete("/Blogs/:id", deleteBlog);

export default router;

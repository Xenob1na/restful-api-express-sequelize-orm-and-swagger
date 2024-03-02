import { Router } from "express";

import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controller/blog.controller";

import { verifyToken } from "../middleware/checkToken";

const router = Router();

router.get("/Blogs", getAllBlogs);
router.get("/Blogs/:id", getBlogById);
router.post("/Blogs", verifyToken, createBlog);
router.put("/Blogs/:id", verifyToken, updateBlog);
router.delete("/Blogs/:id", verifyToken, deleteBlog);

export default router;

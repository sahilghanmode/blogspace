import { Router } from "express";
import { createBlog, getBlogById, getBlogsForUser } from "../controllers/blogController.js";

const blogRoute=Router()

blogRoute.post('/createblog',createBlog)

blogRoute.get('/getBlogById/:blogId',getBlogById)

blogRoute.get('/getBlogForUser/:userId',getBlogsForUser)

export default blogRoute
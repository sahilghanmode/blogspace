import Blog from '../models/BlogMode.js'

export const createBlog=async(req,res)=>{
    try {

        const {title, content, userId}=req.body

        if(!title){
            return res.status(400).json({success:false, message:"title is needed"})
        }

        if(!content){
            return res.status(400).json({success:false, message:"content cannot be empty"})
        }

        const existingBlog = await Blog.findOne({ title: title.trim(), author: userId });

        if (existingBlog) {
            return res.status(400).json({
                success: false,
                message: "A blog with this title already exists. Please use a different title."
            });
        }
        const newBlog = await Blog.create({
            title: title.trim(),
            content: content.trim(),
            author: userId
        });

        return res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog: newBlog
        });

        
    } catch (error) {
        console.log("error in createBlog controller",{error})
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
}

export const getBlogById=async(req,res)=>{
    try {

        const {blogId}=req.params

        const blog=await Blog.findById(blogId)

        if(!blog){
            return res.status(400).json({success:false, message:"could not find blog by the given id"})
        }
        
        return res.status(200).json({success:true, blog})
        
    } catch (error) {
        console.log("error in getBlogById controller",{error})
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
}

export const getBlogsForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    const blogs = await Blog.find({ author: userId })
      .populate("author", "name email avatar") // populate selected fields

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found for this user"
      });
    }

    return res.status(200).json({
      success: true,
      blogs
    });

  } catch (error) {
    console.error("Error in getBlogsForUser controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export const likeOrUnlikeBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { userId } = req.body;

    if (!blogId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Blog ID and User ID are required"
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    const isLiked = blog.likes.includes(userId);

    if (isLiked) {
      blog.likes = blog.likes.filter(id => id.toString() !== userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    return res.status(200).json({
      success: true,
      message: isLiked ? "Blog unliked" : "Blog liked",
      likesCount: blog.likes.length,
      blog
    });

  } catch (error) {
    console.error("Error in likeOrUnlikeBlog controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export const addCommentToBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { userId, comment } = req.body;

    if (!blogId || !userId || !comment || comment.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Blog ID, user ID, and comment are required"
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    const newComment = {
      user: userId,
      comment: comment.trim(),
      createdAt: new Date()
    };

    blog.comments.push(newComment);
    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Comment added",
      comments: blog.comments
    });

  } catch (error) {
    console.error("Error in addCommentToBlog controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
import { Request, Response } from 'express';
import { blog } from '../model/blogModel';

export const createBlog = async (req: Request, res: Response) => {
  const { title, Description, BlogImg } = req.body;
  if (!title || !Description || !BlogImg) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const newBlog = await blog.create({ title, Description, BlogImg });
    res.status(201).json({ message: 'Blog created', blog: newBlog });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blogs', err });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blogData = await blog.findById(id);
    if (!blogData) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blog', err });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedBlog = await blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete blog', err });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, Description, BlogImg } = req.body;
  try {
    const updatedBlog = await blog.findByIdAndUpdate(
      id,
      { title, Description, BlogImg },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog updated successfully', updatedBlog });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update blog', err });
  }
};

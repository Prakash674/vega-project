import mongoose from 'mongoose';

const blogModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    Description: {
      type: String,
      required: true,
    },

    BlogImg: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const blog = mongoose.model('blog', blogModel);

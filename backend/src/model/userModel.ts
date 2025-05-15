import mongoose from 'mongoose';

const userModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    profileImg: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const user = mongoose.model('user', userModel);

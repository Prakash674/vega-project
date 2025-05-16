import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { user } from './model/userModel';
import { authenticateToken } from './middleware';
import blogRoutes from './routes/blogRoutes';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

// API route
app.post('/api/signup', async (req: Request, res: Response) => {
  try {
    const { email, password, profileImg } = req.body;

    if (!email || !password || !profileImg) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = await user.create({ email, password, profileImg });
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are not required' });
    }

    // Check if user already exists
    const existingUser = await user.findOne({ email, password });
    if (!existingUser) {
      return res.status(400).json({ message: 'User not exists login ' });
    }

    const token = jwt.sign(
      {
        email,
      },
      process.env.JWT_SECRET as string
    );

    //  const token =  jwt

    res
      .status(200)
      .json({ message: 'User logged in', user: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

app.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully!' });
});

app.use('/api/blog', blogRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`\x1b[35m🚀 App listening on port ${port} 🚀\x1b[0m`);
});

import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import multer from 'multer';
import path from 'path';

// Configure multer for memory storage (base64)
const storage = multer.memoryStorage();

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Get all users
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid user ID' });
    return;
  }

  try {
    const user = await User.findById(id).lean();
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid user ID' });
    return;
  }

  try {
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true }).lean();
    if (!updated) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid user ID' });
    return;
  }

  try {
    const deleted = await User.findByIdAndDelete(id).lean();
    if (!deleted) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Upload user avatar
export const uploadAvatar = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid user ID' });
    return;
  }

  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Convert buffer to base64
    const base64Data = req.file.buffer.toString('base64');
    
    // Save avatar as base64 in MongoDB
    user.avatar = {
      data: base64Data,
      contentType: req.file.mimetype
    };

    const updated = await user.save();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

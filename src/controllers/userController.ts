import { Request, Response } from 'express';
import User from '../models/User';

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).send('Server Error'));
};

// Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

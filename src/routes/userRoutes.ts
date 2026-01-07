import express, { Router } from 'express';
import { getUsers, getUserById } from '../controllers/userController';

const router: Router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);

export default router;

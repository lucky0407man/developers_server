import express, { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, uploadAvatar, upload } from '../controllers/userController';

const router: Router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/users/:id/avatar', upload.single('avatar'), uploadAvatar);

export default router;

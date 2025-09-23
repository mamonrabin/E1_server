import express from 'express';
import { userController } from './user.controller';
const router = express.Router();

router.post('/create-user', userController.createUser);
router.get('/', userController.getAllUser);
router.get('/:id', userController.getSingleUser);
router.put('/:id', userController.updateSingleUser);
router.delete('/:id', userController.deleteSingleUser);

export const userRoutes = router;

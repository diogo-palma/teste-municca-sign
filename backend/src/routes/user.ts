import { Router } from 'express';
import * as UsersController from '../controllers/users';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateJWT, UsersController.getAllUsers);
router.get('/:id', authenticateJWT, UsersController.getUserById);
router.post('/', UsersController.createUser);
router.put('/:id', authenticateJWT, UsersController.updateUser);
router.delete('/:id', authenticateJWT, UsersController.deleteUser);

export default router;
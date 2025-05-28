import { Router } from 'express';
import { login, register, perfil } from '../controllers/UsuarioController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/perfil', authMiddleware, perfil); // ruta protegida

export default router;
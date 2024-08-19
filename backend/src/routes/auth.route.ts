import { Hono } from 'hono';
import { validationMiddleware } from '../middlewares/validation';
import { magicLinkSchema, registerSchema, socialAuthSchema } from '../types/zod';
import { login, logout, register, socialAuth, verifyAccount } from '../controllers/auth.controller';
import { checkIpInfo, handelIpRequest } from '../middlewares/ipChecker';
import { some, every } from 'hono/combine';
import { isAuthenticated } from '../middlewares/auth';

const authRouter = new Hono()

authRouter.post('/register', some(every(handelIpRequest, validationMiddleware('json', registerSchema))), register);

authRouter.get('/verify', some(every(handelIpRequest, validationMiddleware('query', magicLinkSchema))), verifyAccount);

authRouter.post('/login', some(every(checkIpInfo, validationMiddleware('json', registerSchema))), login);

authRouter.post('/social', some(every(handelIpRequest, validationMiddleware('json', socialAuthSchema))), socialAuth)

authRouter.get('/logout', isAuthenticated, logout);

export default authRouter;
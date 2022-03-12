import express, { Application } from 'express';
import authRoute from './routes/auth';
import profileRouter from './routes/profile';
import cookieParser from 'cookie-parser';
import jwtMiddleware from './auth/jwtMiddleware';

const app: Application = express();

app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/profile', jwtMiddleware, profileRouter);

export default app;

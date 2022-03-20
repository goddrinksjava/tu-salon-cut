import express, { Application, Request, Response, NextFunction } from 'express';
import authRouter from './routes/auth';
import session, { MemoryStore } from 'express-session';
import connect from 'connect-redis';
import redis from './redis';
import classroomRouter from './routes/classroom';
import cors from 'cors';

const app: Application = express();

// app.set('trust proxy', 1);

let RedisStore = connect(session);

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://frontend:3000'],
  }),
);

app.use(
  session({
    store: new RedisStore({ client: redis }),
    // Use an array of secrets to support key rotation as an additional security measure.
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 4, // 4 hours
    },
  }),
);

app.use(express.json());

app.use('/auth', authRouter);
app.use('/classroom', classroomRouter);

export default app;

import express, { Application } from 'express';
import authRouter from './routes/auth';
import session from 'express-session';
import connect from 'connect-redis';
import redis from './redis';
import complaintsRouter from './routes/complaints';
import sessionConfig from './config/sessionConfig';
import commentsRouter from './routes/comments';
import classroomsRouter from './routes/classrooms';

const app: Application = express();

// app.set('trust proxy', 1);

let RedisStore = connect(session);

app.use(
  session({
    store: new RedisStore({ client: redis }),
    ...sessionConfig,
  }),
);

app.use(express.json());

app.use('/auth', authRouter);
app.use('/complaints', complaintsRouter);
app.use('/comments', commentsRouter);
app.use('/classrooms', classroomsRouter);

export default app;

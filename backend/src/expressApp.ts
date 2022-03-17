import express, { Application, json } from 'express';
import authRoute from './routes/auth';
import session from 'express-session';
import connect from 'connect-redis';
import redis from './redis';

const app: Application = express();

app.set('trust proxy', 1);

let RedisStore = connect(session);
app.use(
  session({
    store: new RedisStore({ client: redis }),
    // Use an array of secrets to support key rotation as an additional security measure.
    secret: [
      process.env.SESSION_SECRET_SIGN_1,
      process.env.SESSION_SECRET_SIGN_1,
    ],
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  }),
);

app.use(express.json());

app.use('/auth', authRoute);

export default app;

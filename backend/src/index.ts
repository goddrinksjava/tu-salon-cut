import express, { Application } from 'express';
import authRoute from 'routes/auth';
import profileRouter from 'routes/profile';
import cookieParser from 'cookie-parser';
import jwtMiddleware from 'auth/jwtMiddleware';

const app: Application = express();

const port = 4000;

app.use(cookieParser());

app.use('/auth', authRoute);
app.use('/profile', jwtMiddleware, profileRouter);

app.listen(port, function () {
  console.log(`App is listening on port ${port}`);
});

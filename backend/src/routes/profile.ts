import express from 'express';
const profileRouter = express.Router();

profileRouter.get('/', function (req, res, next) {
  res.send(req.user);
});

export default profileRouter;

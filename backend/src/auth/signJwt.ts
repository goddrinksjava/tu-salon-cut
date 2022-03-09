import jwtConfig from 'config/jwtConfig';
import jwt from 'jsonwebtoken';
import User from 'types/user';

const signJwt = (user: User) => {
  const body = {
    sub: user.id,
    email: user.email,
    role: user.fk_app_role,
  };

  const token = jwt.sign(
    { user: body },
    jwtConfig.secret,
    jwtConfig.signOptions,
  );

  return token;
};

export { signJwt };

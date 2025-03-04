import jwt from 'jsonwebtoken';
import config from '../config';

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });
};
import bcrypt from 'bcrypt';

import config from '../../config';
import { userModel } from '../user/user.model';

import { TUser } from '../user/user.interface';
import { createToken } from '../../../utils/jwt';

const login = async (payload: TUser) => {
  const user = await userModel
    .findOne({ email: payload.email })
    .select('+password');

  if (!user) {
    throw new Error('User not found!');
  }

  const matchPassword = await bcrypt.compare(
    payload.password,
    user.password as string,
  );

  if (!matchPassword) {
    throw new Error('Wrong password!');
  }

  const jwtPayload = {
    email: user.email,
    name: user.name,
    status: user.status,
    role: user.role,
    bio: user.bio,
  };

  const expiresIn: number | undefined = config.access_token_expires_in
    ? Number(config.access_token_expires_in)
    : 60 * 60 * 24 * 10; // default to 10 days in seconds

  const accessToken = createToken(
    jwtPayload,
    config.jwt_acess_token_secret as string,
    expiresIn,
  );

  // Fetch user data without password
  const userData = await userModel.findOne({ email: payload.email });

  return {
    accessToken,
    userData,
  };
};

const signup = async (payload: TUser) => {
  // const { email, password, name, role, status } = payload;

  const existingUser = await userModel.findOne({ email: payload.email });
  if (existingUser) {
    throw new Error('User already exists!');
  }

  // const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create(payload);

  const jwtPayload = {
    email: newUser.email,
    name: newUser.name,
    status: newUser.status,
    role: newUser.role,
    bio: newUser.bio,
  };

  const expiresIn: number | undefined = config.access_token_expires_in
    ? Number(config.access_token_expires_in)
    : 60 * 60 * 24 * 10;

  const accessToken = createToken(
    jwtPayload,
    config.jwt_acess_token_secret as string,
    expiresIn,
  );

  return {
    accessToken,
    userData: newUser,
  };
};

export const authServices = {
  login,
  signup,
};

import { User } from '@prisma/client';
import { Request } from 'express';

export type UserPayload = Omit<User, 'password'>;
export interface AuthenticatedRequest extends Request {
  user: UserPayload;
}
export interface UserWithToken {
  user: UserPayload;
  token: string;
}

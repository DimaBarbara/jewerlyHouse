import type { IUser } from "./IUser";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: IUser;
  token: string;
}

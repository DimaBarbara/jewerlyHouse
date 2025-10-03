export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  email: string;
  token: string;
}

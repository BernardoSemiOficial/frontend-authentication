import { UserInfo } from './user.interface';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
}

export interface LoginGithubResponse {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
}

export interface GenerateAuthUrlGoogleResponse {
  url: string;
}

export interface LoginGoogleResponse {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

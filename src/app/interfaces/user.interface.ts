import { AuthenticationProviders } from '../enums/authentication-providers';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  idProvider: string | null;
  provider: AuthenticationProviders | null;
  infoProvider: {
    google?: UserGoogle;
    github?: UserGithub;
  } | null;
}

export interface UserGoogle {
  id: string;
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  verified_email: true;
}

export interface UserGithub {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: null;
  blog: string;
  location: string;
  email: string | null;
  hireable: null;
  bio: string;
  twitter_username: null;
  notification_email: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
}

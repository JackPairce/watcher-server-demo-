export interface user {
  username: string;
  password: string;
  token: string;
}

export interface server {
  hostname: string;
  public_ip: string;
  status: Status;
  last_updated: number;
}

export type Status = 1 | 0 | -1;

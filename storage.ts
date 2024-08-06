import { server, Status, user } from "./type";

export class Users {
  users: user[] = [];

  constructor() {
    this.users = [];
  }

  addUser(username: string, password: string) {
    if (this.getUser(username)) {
      throw new Error("User already exists");
    }
    const token = require("crypto").randomBytes(64).toString("hex");
    this.users.push({ username, password, token });
  }

  getUser(username: string) {
    return this.users.find((user) => user.username === username);
  }

  deleteUser(username: string) {
    this.users = this.users.filter((user) => user.username !== username);
  }

  updateUser(username: string, password: string) {
    const user = this.getUser(username);
    if (user) {
      user.password = password;
    }
  }
}

export class Servers {
  servers: server[] = [];

  constructor() {
    this.servers = [];
  }
  addServer(
    hostname: string,
    public_ip: string,
    status: Status,
    last_updated: number
  ) {
    if (this.getServer(hostname)) {
      return "Server already exists";
    }
    this.servers.push({ hostname, public_ip, status, last_updated });
    return "Server added";
  }

  getServers() {
    this.servers.map((server) => {
      if (server.last_updated < Date.now().valueOf() - 10000) {
        server.status = -1;
      }
    });
    return this.servers;
  }

  getServer(hostname: string) {
    return this.servers.find((server) => server.hostname === hostname);
  }

  updateServer(
    hostname: string,
    public_ip: string,
    status: Status,
    last_updated: number
  ) {
    const server = this.getServer(hostname);
    if (server) {
      server.public_ip = public_ip;
      server.status = status;
      server.last_updated = last_updated;
    }
  }
}

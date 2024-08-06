import { Request, Response, Router } from "express";
import { Servers } from "../storage";
import { clientIp } from "../utils/ip";

const router = Router();

// Setup Storage
const servers = new Servers();

router.post("/register", (req: any, res: any) => {
  const { hostname } = req.body;
  if (!hostname) {
    res.status(400).send("Missing hostname");
    return;
  }
  const public_ip = clientIp(req);
  let response = servers.addServer(
    hostname,
    public_ip,
    1,
    Date.now().valueOf()
  );
  res.send(response);
});

router.get("/list", (req: any, res: any) => {
  const serversList = servers.getServers();
  res.send(serversList);
});

router.post("/update", (req: any, res: any) => {
  const { hostname } = req.body;
  if (!hostname) {
    res.status(400).send("Missing hostname");
    return;
  }
  const public_ip = clientIp(req);
  const server = servers.getServer(hostname);
  if (server) {
    servers.updateServer(hostname, public_ip, 1, Date.now().valueOf());
    res.status(200).send("Server updated");
  } else {
    res.status(400).send("Server not found");
  }
});

router.post("/find", (req: Request, res: Response) => {
  const { hostname } = req.body;
  if (!hostname) {
    res.status(400).send("Missing hostname");
    return;
  }
  const server = servers.getServer(hostname);
  if (server) {
    res.status(200).send("server found");
  } else {
    res.status(400).send("Server not found");
  }
});

export default router;

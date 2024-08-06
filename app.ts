const express = require("express");
import { Express, Request, Response } from "express";
import ServersRouter from "./routes/serverRouter";
import UsersRouter from "./routes/userRouter";
const app: Express = express();

// Middleware to parse JSON bodies
app.use(express.json());
const port = 3000;

app.all("/", async (req: Request, res: Response) => {
  res.send(`Welcome to the server, @Jack_Pairce\n`);
});

app.use("/user", UsersRouter);
app.use("/server", ServersRouter);

app.get("/ifconfig", (req: Request, res: Response) => {
  // Get the client's IP address
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  res.send(`Your public IP address is: ${clientIp}\n`);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

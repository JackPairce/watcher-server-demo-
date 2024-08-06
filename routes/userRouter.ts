import { Router } from "express";
import { Users } from "../storage";

const router = Router();

// Setup Storage
const users = new Users();

router.get("/register", (req: any, res: any) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send("Missing username or password");
    return;
  }
  users.addUser(username, password);
  res.send("User registered");
});

export default router;

import { Request } from "express";
export const clientIp = (req: Request) => {
  return (
    (
      (req.headers["x-forwarded-for"] || req.socket.remoteAddress) as string
    )?.split(",")[0] || "0.0.0.0"
  );
};

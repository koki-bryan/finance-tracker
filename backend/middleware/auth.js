import jwt from "jsonwebtoken";

export function authMiddleWare(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "no token" });
}

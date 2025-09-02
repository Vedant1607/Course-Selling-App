import jwt, { type JwtPayload } from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";
import { JWT_ADMIN_PASSWORD, JWT_USER_PASSWORD } from "./config.js";

interface AuthRequest extends Request {
  userId?: String;
}

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    if (!JWT_ADMIN_PASSWORD) {
      throw new Error("JWT secret is not configured");
    }
    const decoded = jwt.verify(authHeader, JWT_ADMIN_PASSWORD) as JwtPayload & {
      id?: string;
    };
    if (!decoded.id) {
      return res.status(403).json({ message: "Invalid token payload" });
    }

    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Erro:", err);
    res.status(500).json({ message: "Invalid or expired token" });
  }
};

export const userMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    if (!JWT_USER_PASSWORD) {
      throw new Error("JWT secret is not configured");
    }

    const decoded = jwt.verify(authHeader, JWT_USER_PASSWORD) as JwtPayload & {
      id?: string;
    };
    if (!decoded.id) {
      return res.status(403).json({ message: "Invalid token payload" });
    }
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

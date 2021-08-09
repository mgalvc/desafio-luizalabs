import { Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import configs from "../configs/configs";

export default (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: any) => {
    const { authorization } = req.headers;
    
    try {
      const [_, token] = authorization.split(' ');
      const { role } = verify(token, configs.jwtSecret(), { ignoreExpiration: false }) as any;
      
      if(allowedRoles.includes(role)) {
        return next();
      }

      return res.status(403).json({ message: 'You are not allowed to perform this action' });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
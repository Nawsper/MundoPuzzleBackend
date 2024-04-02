import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../jwt/auth.js";

export const authorize = (role) => (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, PRIVATE_KEY);
        if (decodedToken.role === role) {
            next();
        } else {
            return res.status(403).json({ error: 'Permission denied' });
        }
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

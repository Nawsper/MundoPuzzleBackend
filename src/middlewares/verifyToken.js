import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../jwt/auth.js";
import UserDaoMongoDB from "../persistence/daos/mongodb/user.dao.js";
const userDao = new UserDaoMongoDB();

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) return res.status(401).json({ msg: "Unauthorized" });
        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token, PRIVATE_KEY);
        console.log("decode::", decode);
        const user = await userDao.getById(decode.userId);
        if (!user) return res.status(401).json({ msg: "Unauthorized" });
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
};
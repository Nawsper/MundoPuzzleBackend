import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const PRIVATE_KEY = process.env.SECRET_KEY_JWT;

export const generateToken = (user) => {
    const payload = {
        userId: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        role: user.role
    };

    const token = jwt.sign(payload, PRIVATE_KEY, {
        expiresIn: '20m'
    });

    return token;
};
import passport from "passport";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import UserDao from '../persistence/daos/mongodb/user.dao.js'
import { PRIVATE_KEY } from "../jwt/auth.js";

const userDao = new UserDao()

// Jwt con cookies

const verifyToken = async (jwt_payload, done) => {
    console.log('payload', jwt_payload);
    const user = await userDao.getById(jwt_payload.userId);
    if (!user) return done(null, false);
    return done(null, jwt_payload);
}

const cookieExtractor = (req) => {
    const token = req.cookies.token;
    console.log('Cookie:', token);
    return token;
}

const strategyOptionsCookies = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: PRIVATE_KEY
};

passport.use('current', new jwtStrategy(strategyOptionsCookies, verifyToken));


passport.serializeUser((user, done) => {
    done(null, user.userId);
});

passport.deserializeUser(async (id, done) => {
    const user = await userDao.getById(id);
    return done(null, user);
});
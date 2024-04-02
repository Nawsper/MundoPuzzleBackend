// npm i passport-google-oauth20
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import 'dotenv/config'

import UserDao from "../persistence/daos/mongodb/user.dao.js";
const userDao = new UserDao();

//http://console.cloud.google.com

const strategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email'],
    state: true,
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    const email = profile._json.email;
    const user = await userDao.getByEmail(email);
    if (user) return done(null, user);
    const newUser = await userDao.register({
        first_name: profile._json.given_name,
        last_name: profile._json.family_name,
        email,
        password: '',
        isGoogle: true
    });
    return done(null, newUser);
};

passport.use("google", new GoogleStrategy(strategyOptions, registerOrLogin));

passport.serializeUser((user, done) => { done(null, user) })
passport.deserializeUser((id, done) => { done(null, id) })
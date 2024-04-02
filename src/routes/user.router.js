import { Router } from "express";
import UserController from "../controllers/user.controllers.js";
import passport from "passport";

const controller = new UserController()

const router = Router();

//register
router.post('/register', passport.authenticate('register'), controller.register);

//login
router.post('/login', passport.authenticate('login'), controller.login);

//google
router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', {
    failureRedirect: '/errorRegister',
    successRedirect: '/profile',
    passReqToCallback: true
}));

//github
router.get("/register-github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/profile-github", passport.authenticate("github", {
    failureRedirect: '/errorRegister',
    successRedirect: '/profile',
    passReqToCallback: true
}));

//jwt - dto
router.get('/current/dto/:id', passport.authenticate('current'), controller.getByIdDTO);

//delete users
router.delete('/', controller.deleteUsers)

//logout
// router.get("/logout", controller.logout);


export default router;



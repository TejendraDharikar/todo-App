import { Application } from "express";
import session from "express-session";
import passport from "passport";

export function passportConfig(app:Application){
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret", // use a strong secret in .env
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // set secure:true if using HTTPS
  })
);


  app.use(passport.initialize());
app.use(passport.session());
}
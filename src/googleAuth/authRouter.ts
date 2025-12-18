import { Application } from "express";
import passport from "passport";


export function authRouter(app:Application) {
  // Step 1: Redirect to Google
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google redirects back here
app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "users/login" }),
  (req, res) => {
    // Successful authentication
    res.json({ user: req.user });
  }
);

}
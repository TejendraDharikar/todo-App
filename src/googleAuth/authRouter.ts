// import { Application } from "express";
// import passport from "passport";


// export function authRouter(app:Application) {
//   // Step 1: Redirect to Google
// app.get("/auth/google",
//   passport.authenticate("google", { 
//     scope: ["profile", "email"],
//     prompt:"consent",
//     // prompt:"select_account",
//     session:true,
//    })
// );

// // Step 2: Google redirects back here
// app.get("/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "users/login" }),
//   (req, res) => {
//     // Successful authentication
//     res.json({ user: req.user });
//   }
// );

// app.get("/logout", (req, res) => {
//   req.logout(err => {
//     if (err) return res.status(500).json({ message: "Logout failed" });
//     req.session.destroy(() => {
//       res.clearCookie("connect.sid"); // remove session cookie
//       res.json({ message: "Logged out successfully" });
//     });
//   });
// });

// }
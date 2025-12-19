// authStrategy.ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../lib/prisma";
import { ENV } from "../lib/env";


passport.use(
  new GoogleStrategy(
    {
      clientID: ENV.GOOGLE_CLIENT_ID || "",
      clientSecret: ENV.GOOGLE_CLIENT_SECRET ||"",
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
    

      try {
           console.log("AccessToken:", accessToken);
    console.log("RefreshToken:", refreshToken);
    console.log("Profile:", profile);
        let user = await prisma.users.findUnique({
          where: { googleId: profile.id },
        });

        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error("No email found"), false);

        if (!user) {
          user = await prisma.users.create({
            data: {
              googleId: profile.id,
              email,
              name: profile.displayName,
              role: "user",
            },
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id); 
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.users.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


export default passport;
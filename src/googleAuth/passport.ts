// authStrategy.ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../lib/prisma";
import { ENV } from "../lib/env";

passport.use(
  new GoogleStrategy(
    {
      clientID: "1083985565328-rirqpkbrs8ug8a59230a2hm5hq7i95lr.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/auth/google/callback",
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
  done(null, user.id); // store user ID in session
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.users.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


// Export passport so routes can use it
export default passport;
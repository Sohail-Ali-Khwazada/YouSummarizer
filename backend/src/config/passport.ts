import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import config from "./config"
import User from "../models/user.model";
import { UserDocument } from "../types/custom";


passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void
    ) => {
      try {
        let user: UserDocument | null = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            fullname: profile.displayName,
            email: profile.emails?.[0].value,
            googleId: profile.id,
            profilePic: profile.photos?.[0].value,
          });
        }

        done(null, user);
      } catch (err) {
        done(err, undefined);
      }
    }
  )
);

export default passport;

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import type { OAuthProfile } from '../types/OAuthProfile';

passport.use(
   new GoogleStrategy(
      {
         clientID: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
         callbackURL: '/api/auth/google/callback',
      },
      (_accessToken, _refreshToken, profile, done) => {
         const userProfile: OAuthProfile = {
            id: profile.id,
            email: profile?.emails?.[0]?.value!,
            name: profile?.displayName!,
            avatarUrl: profile?.photos?.[0]?.value!,
         };
         done(null, userProfile);
         console.log('++++++++++++++++++++User profile', profile);
      }
   )
);

export default passport;

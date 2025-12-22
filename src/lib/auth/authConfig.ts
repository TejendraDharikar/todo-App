import { TConfig } from '@baijanstack/express-auth';
import { TGoogleAuthConfig } from '@baijanstack/express-auth/src/lib/auth-interfaces';

type FullAuthConfig = TConfig & TGoogleAuthConfig;
export const baseConfig: TConfig = {
  BASE_PATH: '/auth',
  SALT_ROUNDS: 10,
  TOKEN_SECRET: process.env.TOKEN_SECRET!,
  ACCESS_TOKEN_AGE: 60,
  REFRESH_TOKEN_AGE: 604800,
  OTP_AGE: 30,
  OTP_SECRET: process.env.OTP_SECRET!,
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
  COOKIE_SAME_SITE: (process.env.COOKIE_SAME_SITE as 'lax' | 'strict' | 'none') || 'lax',
  COOKIE_SECURE: process.env.COOKIE_SECURE === 'true',
};

export const googleConfig: TGoogleAuthConfig = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
  GOOGLE_SUCCESS_REDIRECT_URI: process.env.GOOGLE_SUCCESS_REDIRECT_URI!,
  GOOGLE_FAILURE_REDIRECT_URI: process.env.GOOGLE_FAILURE_REDIRECT_URI!,
};
console.log("this is google configurATION DATA",googleConfig);

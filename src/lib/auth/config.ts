import { GoogleAuthGenerator, initAuth, RouteGenerator } from "@baijanstack/express-auth";
import { Application } from "express";

import { baseConfig, googleConfig } from "./authConfig";
import { EmailNotificationService } from "./notifier";
import { GoogleOAuthHandler } from "../../handler/authHandler/googleOAuth";
import { SignUpHandler, LoginHandler, LogoutHandler, RefreshHandler, ResetPasswordHandler, MeRouteHandler, VerifyEmailHandler, ForgotPasswordHandler, SendOtpHandler } from "../../handler/authHandler/localHandler";

export function initAuthConfig(app:Application){
const notifier = new EmailNotificationService();
const authConfig = { ...baseConfig, ...googleConfig };
const routeGenerator = new RouteGenerator(app, notifier, authConfig);

const oAuthHandler = new GoogleOAuthHandler();
const googleGenerator = new GoogleAuthGenerator(app, authConfig, oAuthHandler);

initAuth({
  routeGenerator,
  signUpHandler: new SignUpHandler(),
  loginHandler: new LoginHandler(),
  logoutHandler: new LogoutHandler(),
  refreshHandler: new RefreshHandler(),
  resetPasswordHandler: new ResetPasswordHandler(),
  meRouteHandler: new MeRouteHandler(),
  verifyEmailHandler: new VerifyEmailHandler(),
  forgotPasswordHandler: new ForgotPasswordHandler(),
  sendOtpHandler: new SendOtpHandler(),
  googleOAuth: {
    generator: googleGenerator,
    oAuthHandler,
  },
});
}
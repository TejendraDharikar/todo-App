import {
  ISignUpHandler,
  ILoginHandler,
  ILogoutHandler,
  IRefreshHandler,
  IResetPasswordHandler,
  IMeRouteHandler,
  IVerifyEmailHandler,
  IForgotPasswordHandler,
  ISendOtpHandler,
} from "@baijanstack/express-auth";
import { prisma } from "../../lib/prisma";

export class SignUpHandler implements ISignUpHandler {
  doesUserExists = async (body: { email: string }) => {
    const user = await prisma.users.findUnique({
      where: { email: body.email.toLowerCase() },
    });
    return !!user;
  };

  saveUser = async (
    body: { name: string; email: string },
    hashedPassword: string
  ) => {
    await prisma.users.create({
      data: {
        email: body.email.toLowerCase(),
        name: body.name,
        password: hashedPassword,
        provider: "local",
        // If you want OTP verification, set false and rely on /send-otp + /verify-email
        isEmailVerified: true,
      },
    });
  };
}

export class LoginHandler implements ILoginHandler {
  getUserByEmail = async (email: string) => {
    return prisma.users.findUnique({ where: { email: email.toLowerCase() } });
  };

  getTokenPayload = async (email: string) => {
    const user = await prisma.users.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!user) return null;
    return { email: user.email, name: user.name ?? undefined };
  };
}

export class LogoutHandler implements ILogoutHandler {
  shouldLogout = async () => true;
}

export class RefreshHandler implements IRefreshHandler {
  getTokenPayload = async (email: string) => {
    const user = await prisma.users.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!user) return null;
    return { email: user.email, name: user.name ?? undefined };
  };
}

export class ResetPasswordHandler implements IResetPasswordHandler {
  saveHashedPassword = async (email: string, hashedPassword: string) => {
    await prisma.users.update({
      where: { email: email.toLowerCase() },
      data: { password: hashedPassword },
    });
  };

  getOldPasswordHash = async (email: string) => {
    const user = await prisma.users.findUnique({
      where: { email: email.toLowerCase() },
    });
    return user?.password || "";
  };
}

export class MeRouteHandler implements IMeRouteHandler {
  getMeByEmail = async (email: string) => {
    const user = await prisma.users.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!user) return null;
    return { name: user.name ?? "", email: user.email };
  };
}

export class VerifyEmailHandler implements IVerifyEmailHandler {
  isEmailAlreadyVerified = async (email: string) => {
    const user = await prisma.users.findUnique({
      where: { email: email.toLowerCase() },
    });
    // Return true if NOT verified (matches your library’s expectation from snippet)
    return !user?.isEmailVerified;
  };

  updateIsEmailVerifiedField = async (email: string) => {
    await prisma.users.update({
      where: { email: email.toLowerCase() },
      data: { isEmailVerified: true },
    });
  };
}

export class SendOtpHandler implements ISendOtpHandler {
  doesUserExists = async (email: string) => {
    const user = await prisma.users.findUnique({
      where: { email: email.toLowerCase() },
    });
    return !!user;
  };
}

export class ForgotPasswordHandler implements IForgotPasswordHandler {
  saveNewPassword = async (email: string, hashedPassword: string) => {
    await prisma.users.update({
      where: { email: email.toLowerCase() },
      data: { password: hashedPassword },
    });
  };
}

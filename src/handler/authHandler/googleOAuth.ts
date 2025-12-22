import { IOAuthHandler, AuthProvider } from "@baijanstack/express-auth";
import { prisma } from "../../lib/prisma";

export class GoogleOAuthHandler implements IOAuthHandler {
  async createOrUpdateUser(params: {
    email: string;
    provider: AuthProvider; // 'GOOGLE'
    googleId: string;
    displayName?: string;
    profileImage?: string;
  }): Promise<boolean> {
    const email = params.email.toLowerCase();

    await prisma.users.upsert({
      where: { email },
      update: {
        googleId: params.googleId,
        provider: "google",
        name: params.displayName || undefined,
        profileImageUrl: params.profileImage || undefined,
        isEmailVerified: true,
      },
      create: {
        email,
        googleId: params.googleId,
        provider: "google",
        name: params.displayName || "Google User",
        profileImageUrl: params.profileImage || null,
        password: "", // OAuth users don't have passwords
        isEmailVerified: true,
      },
    });

    return true;
  }

  async getTokenPayload(email: string) {
    const user = await prisma.users.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!user) throw new Error("User not found");
    return {
      email: user.email,
      name: user.name || "Google User",
      provider: user.provider,
    };
  }
}

import { prisma } from "../../lib/prisma";
import { signAccessToken } from "../lib/jwt";
import { hashPassword, verifyPassword } from "../lib/password";
import type { LoginInput, RegisterInput } from "../validators/auth.validator";

const publicUserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const register = async (input: RegisterInput) => {
  const passwordHash = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      passwordHash,
    },
    select: publicUserSelect,
  });

  const accessToken = signAccessToken(user.id);

  return { user, accessToken };
};

export const login = async (input: LoginInput) => {
  // Fetch only what we need for password verification
  const userWithHash = await prisma.user.findUnique({
    where: { email: input.email },
    select: { ...publicUserSelect, passwordHash: true },
  });

  if (
    !userWithHash ||
    !(await verifyPassword(input.password, userWithHash.passwordHash))
  ) {
    return null;
  }

  // Strip passwordHash before returning — the rest matches publicUserSelect exactly
  const { passwordHash: _, ...user } = userWithHash;

  const accessToken = signAccessToken(user.id);

  return { user, accessToken };
};

export const getCurrentUser = async (userId: string) =>
  prisma.user.findUnique({
    where: { id: userId },
    select: publicUserSelect,
  });

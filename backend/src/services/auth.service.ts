import { prisma } from "../../lib/prisma";
import { signAccessToken } from "../lib/jwt";
import { hashPassword, verifyPassword } from "../lib/password";
import { AppError } from "../utils/AppError";
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
  
  // Case-insensitive check for (firstName, lastName) combination uniqueness
  const existingName = await prisma.$queryRaw<Array<{ id: string }>>`
    SELECT id FROM User 
    WHERE LOWER(firstName) = LOWER(${input.firstName}) 
      AND LOWER(lastName) = LOWER(${input.lastName}) 
    LIMIT 1
  `;

  if (existingName.length > 0) {
    throw new AppError(
      409,
      "A user with this first and last name already exists",
    );
  }

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
  // Case-insensitive lookup for email
  const matchingUser = await prisma.$queryRaw<Array<{ id: string }>>`
    SELECT id FROM User 
    WHERE LOWER(email) = LOWER(${input.email}) 
    LIMIT 1
  `;

  if (matchingUser.length === 0) {
    return null;
  }

  const userWithHash = await prisma.user.findUnique({
    where: { id: matchingUser[0].id },
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

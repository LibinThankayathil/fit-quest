import jwt, { type Secret } from "jsonwebtoken";
import type { StringValue } from "ms";

function getAccessSecret(): Secret {
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET environment variable is required");
  }

  return secret;
}

const accessExpiresIn = (process.env.JWT_ACCESS_EXPIRES_IN ?? "7d") as StringValue;

export type AccessTokenPayload = {
  sub: string;
};

export const signAccessToken = (userId: string) =>
  jwt.sign({ sub: userId } satisfies AccessTokenPayload, getAccessSecret(), {
    expiresIn: accessExpiresIn,
  });

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  const payload = jwt.verify(token, getAccessSecret());

  if (typeof payload === "string" || !payload.sub) {
    throw new Error("Invalid token payload");
  }

  return { sub: payload.sub };
};

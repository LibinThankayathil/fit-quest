import type { Request } from "express";

/**
 * Use `AuthenticatedRequest` as the req type in any controller that sits
 * behind the `authenticate` middleware. This eliminates the `req.user!`
 * non-null assertion throughout the codebase.
 */
export type AuthenticatedRequest = Request & {
  user: {
    id: string;
  };
};

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export {};

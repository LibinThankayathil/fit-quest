/**
 * The name of the HttpOnly cookie that carries the JWT access token.
 * Defined once here so that auth.controller and auth.middleware always agree.
 */
export const ACCESS_TOKEN_COOKIE = "accessToken";

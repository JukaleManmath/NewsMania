import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  sub: string;
  name?: string;
  picture?: string;
  exp?: number;
}

export const getUserFromToken = (): JwtPayload | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    // decode the token using default import
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
};

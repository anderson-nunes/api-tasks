import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface TokenPayload {
  id: string;
  name: string;
}

export const createToken = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, process.env.JWT_KEY as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

export const getPayload = (token: string): TokenPayload | null => {
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY as string);

    return payload as TokenPayload;
  } catch (error) {
    return null;
  }
};

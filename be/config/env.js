import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") {
  config({ path: ".env.development.local" });
}

export const { 
    PORT, 
    DB_URI, 
    ARCJET_KEY,
    ARCJET_ENV,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
    JWT_SECRET,
    JWT_EXPIRES_IN
} = process.env;
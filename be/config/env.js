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
    R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME,
    R2_SIGNED_URL_EXPIRES,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    DOWNLOAD_TOKEN_SECRET
} = process.env;
import nodemailer from 'nodemailer'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } from './env.js'


export const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    type: "OAuth2",
    user: "symondtedi@gmail.com",
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    refreshToken: GOOGLE_REFRESH_TOKEN,
  },
});
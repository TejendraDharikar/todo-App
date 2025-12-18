import {config} from 'dotenv';
import z from 'zod';

config({
  path:".env",
});

const ENV_Schema = z.object({
  JWT_SECRET: z.string().default("key"),
  JWT_EXPIRTATION_TIME_IN_SECONDS: z.number().default(60),
  JWT_TOKEN_COOKIE_AGE_IN_SECONDS: z.number().default(60),
  REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS: z.number().default(120),
  REFRESH_TOKEN_COOKIE_AGE_IN_SECONDS: z.number().default(120),

  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
});

type ENV_Type = z.infer<typeof ENV_Schema>;

export const ENV:ENV_Type = {
  JWT_SECRET: process.env.JWT_SECRET || "key",
  JWT_EXPIRTATION_TIME_IN_SECONDS:Number(process.env.JWT_EXPIRTATION_TIME_IN_SECONDS) || 60 ,
  JWT_TOKEN_COOKIE_AGE_IN_SECONDS:Number(process.env.JWT_TOKEN_COOKIE_AGE_IN_SECONDS) || 60,
  REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS:Number(process.env.REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS) || 120,
  REFRESH_TOKEN_COOKIE_AGE_IN_SECONDS:Number(process.env.REFRESH_TOKEN_COOKIE_AGE_IN_SECONDS) || 120,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
}
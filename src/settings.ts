import { config } from 'dotenv';

config({ path: '.env.example' });

export const DATABASE_TYPE = 'postgres';
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_PORT = process.env.DATABASE_PORT;

export const API_PORT = Number(process.env.API_PORT);

export const SESSION_SECRET = process.env.SESSION_SECRET;

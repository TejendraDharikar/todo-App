import 'dotenv/config';
import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  user:"root",
  password:"shero1234",
  port:3307,
  host:"localhost",
  database:"todo_app",
  connectionLimit: 5
})
export const prisma = new PrismaClient({ 
  adapter
});
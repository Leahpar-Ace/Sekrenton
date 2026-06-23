import * as dotenv from "dotenv";
import { defineConfig } from "prisma/config";

// Force load the .env file explicitly from the current directory
dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DIRECT_URL,
  },
});
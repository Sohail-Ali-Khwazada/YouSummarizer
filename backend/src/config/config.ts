import "dotenv/config"
import { Config } from "../types/custom";

const config: Config = {
  PORT: Number(process.env.PORT) || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI || "",
  FLASK_URI: process.env.FLASK_URI || "",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
};

export default config;
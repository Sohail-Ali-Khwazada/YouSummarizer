import "dotenv/config"

interface Config {
  PORT: number;
  NODE_ENV: string;
  MONGO_URI: string;
  ACCESS_TOKEN_SECRET: string;
}

const config: Config = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: "mongodb+srv://sohailali:s123456@sohailscluster.cdg79co.mongodb.net/?retryWrites=true&w=majority&appName=Sohailscluster",
  ACCESS_TOKEN_SECRET: "sohailalik"
};

export default config;
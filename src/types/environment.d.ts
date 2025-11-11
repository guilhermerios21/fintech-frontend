declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
    VEHICLE_API_URL?: string;
    NODE_ENV?: "development" | "production";
  }
}

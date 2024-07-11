import dotenv from "dotenv";
dotenv.config();
const config = {
  port: process.env.PORT,
  jwt: {
    jwt_secret: process.env.JWT_SECRET || "my_secret_key",
    accessTokenExpiryMS: "30s",
    refreshTokenExpiryMS: "100s",
  },
};
export default config;

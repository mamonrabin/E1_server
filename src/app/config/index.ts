import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });
export default {
  port: process.env.PORT,
  database_url: process.env.MONGO_CONNECTION_STRING,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,

  jwt_acess_token_secret: process.env.JWT_SECRET,
  access_token_expires_in: process.env.JWT_EXPIRES_IN,
  refresh_secret: process.env.JWT_REFRESH_SECRET,
  refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,

  uploadFolder: process.env.UPLOAD_FOLDER,
  uploadPath: process.env.UPLOAD_PATH,
};




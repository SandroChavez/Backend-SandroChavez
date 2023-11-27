import jwt from "jsonwebtoken";
import { config } from "dotenv";

config()

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export const jwtValidation = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    const userToken = jwt.verify(token, SECRET_KEY_JWT);
    console.log(userToken);
    req.user = userToken;
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};
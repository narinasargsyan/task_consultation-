import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

class AuthService {
  async signToken(payload, secretKey, expiresIn, keyName) {
    const token = await jwt.sign(payload, secretKey, { expiresIn });
    return token;
  }

  async signAccessToken(payload) {
    return this.signToken(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      600,
      "accessToken"
    );
  }
  async verifyToken(token, secretKey) {
    return jwt.verify(token, secretKey);
  }

  async verifyAccessToken(token) {
    return this.verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
  }
}

export = new AuthService();

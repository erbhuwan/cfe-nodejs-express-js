import jwt from "jsonwebtoken";
import doetnv from "dotenv";
import User from "./userSchema.js";

doetnv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(401).json({
        message: "Unauthorized 1",
      });
    }
    const token = bearerToken.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS512"],
      issuer: "TODO APP",
      ignoreExpiration: false,
    });

    if (!decodedToken) {
      return res.status(403).json({
        message: "Unauthorized 2",
      });
    }

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    req.user = user;
    return next();
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({
      message: "Unauthorized 3",
    });
  }
};

import User from "./userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        message: "User with the provided email already exists.",
      });
    }

    // hashing the password before saving into the db
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (!user) {
      return res.status(500).json({
        message: "User couldn't be created",
      });
    }

    const { password: userPassword, ...remainingFields } = user.toJSON();
    return res.status(201).json({
      message: "User created successfully",
      user: remainingFields,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // compare password with hashed password
    const flag = await bcrypt.compare(password, user.password);
    if (!flag) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // generate json web token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5m",
        algorithm: "HS512",
        issuer: "TODO APP",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserProfile = (req, res, next) => {
  return res.status(200).json({
    profile: req.user,
  });
};

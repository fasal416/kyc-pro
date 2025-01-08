const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.postRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Registration successful",
      user: { _id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error(error);
    error.message = "Something went wrong while registering the user";
    next(error);
  }
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        KYCStatus: user.KYCStatus,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    error.message = "Something went wrong while logging in";
    next(error);
  }
};

exports.getAuthState = async (req, res, next) => {
  if (!req.cookies.authToken) {
    return res
      .status(200)
      .json({ isLoggedIn: false, message: "No user logged in" });
  }

  try {
    const payload = jwt.verify(req.cookies.authToken, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: payload.userId });

    if (!user) {
      return res.status(200).json({ message: "No user logged in" });
    }
    return res.status(200).json({
      message: "User is logged in",
      isLoggedIn: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        KYCStatus: user.KYCStatus,
        role: user.role,
      },
    });
  } catch (error) {
    error.message = "Something went wrong while checking auth state";
    next(error);
  }
};

exports.postLogout = (req, res, next) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

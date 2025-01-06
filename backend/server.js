const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "build", "frontend")));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/kyc", require("./routes/kyc"));

app.use(errorMiddleware);

mongoose
  .connect(process.env.DB_URL, {})
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 8080, () =>
      console.log(`Server running on port ${process.env.PORT || 8080}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));

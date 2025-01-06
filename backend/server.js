const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, "build", "frontend")));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));

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

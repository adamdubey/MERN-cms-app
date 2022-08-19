require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");

const morgan = require("morgan");

const app = express();
const http = require("http").createServer(app);

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// route middlewares
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);

const PORT = process.env.PORT || 8000;

http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
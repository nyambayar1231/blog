const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("./middleware/logger");
// Router oruulj ireh
const usersRoutes = require("./routes/users");
const blogsRoutes = require("./routes/blogs");
const adminRoutes = require("./routes/admin");
const commentsRoutes = require("./routes/comments");

const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const corsOptions = require("./config/corsOptions");

dotenv.config({ path: "./config/config.env" });

// CREATE EXPRESS APP
const app = express();

// CONNECTING TO THE MONGODB DATABASE
connectDB();

//Corse tohiruulav
app.use(cors(corsOptions));

//Parsing body data to JSON
app.use(cookieParser());
app.use(express.json());
app.use(logger);

//REST API RESOURCES
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/blogs", blogsRoutes);
app.use("/api/v1/admins", adminRoutes);
app.use("/api/v1/comments", commentsRoutes);

app.use(errorHandler);

// Starting express server
const server = app.listen(
  process.env.PORT,
  console.log(`express server ${process.env.PORT} порт дээр аслаа`.rainbow)
);

// Catching missed errors
process.on("unhandledRejection", (err, promise) => {
  console.log(`Алдаа гарлаа : ${err?.message}`.underline.red.bold);
  server.close(() => {
    process.exit();
  });
});

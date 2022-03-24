import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/health-check", function (req, res) {
  res.status(200).json({
    status: 1,
    message: "okay",
  });
});

app.use("/api/user", userRoutes);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port} ..`.yellow
      .bold
  );
});

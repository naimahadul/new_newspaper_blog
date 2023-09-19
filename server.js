import express from "express";
const app = express();
import authrouter from "./routes/authRoutes.js";
import blogsrouter from "./routes/blogsRoutes.js";
import ErrorHandler from "./middleware/errorHandler.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
app.use(bodyParser.json());

app.use("/auth", authrouter);
app.use("/blogs", blogsrouter);
app.use(ErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

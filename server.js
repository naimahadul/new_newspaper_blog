import express from "express";
const app = express();
import authrouter from "./routes/authRoutes.js";
import blogsrouter from "./routes/blogsRoutes.js";
import ErrorHandler from "./middleware/errorHandler.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();
app.use(bodyParser.json());
const corsConfig = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsConfig));

app.use("/auth", authrouter);
app.use("/blogs", blogsrouter);
app.use(ErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

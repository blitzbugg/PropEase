import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js'
import postRoute from './routes/post.route.js';

const app = express();

app.use(express.json())
app.use(cookieParser())
dotenv.config();

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

app.listen(8800, () => {
    console.log('Server is running on http://localhost:8800');
});
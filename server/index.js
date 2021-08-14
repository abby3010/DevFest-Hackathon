import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

// Login check middleware
import checkLoginStatus from './middlewares/checkLoginStatus.js';

// Import Routes
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import updateRouter from "./routes/updateRoutes.js";
import { contactForm } from './routes/contactForm.js';

const app = express();

app.use(cors());
app.use(express.json());


app.use("/auth", authRouter);
app.use("/contact", contactForm);
app.use("/user", checkLoginStatus, userRouter);
app.use("/update", checkLoginStatus, updateRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Running Workosmo server on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

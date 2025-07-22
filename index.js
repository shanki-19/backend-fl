// const express = require('express')
import e from 'express';
const app = e();
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
config();
const port = process.env.PORT || 4000

app.use(e.json());
app.use(e.urlencoded({extended:true}))


mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Mongodb connected successfully"))
    .catch((err) => console.error("Error while connecting to the database:", err))
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
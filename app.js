import express from "express";
import session from 'express-session';
import { secretKey } from "./config/config.js";
const app = express();
const port  = process.env.PORT||8080;
import path from 'path';
import connectDB from "./db/connectDB.js";
import commonRouter from "./router/commonRouter.js";
import userRouter from "./router/userRouter.js";
import postRouter from "./router/postRouter.js";
const DATABASE_URL = process.env.DATABASE_URL||"mongodb://127.0.0.1:27017"
connectDB(DATABASE_URL);


// Session Setup
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : secretKey
}))

// setup for static files
app.use(express.static(path.join(process.cwd(),'public')));

app.use(express.urlencoded({extended:false}))

// setup for ejs
app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', commonRouter)
app.use('/user', userRouter)
app.use('/user/post', postRouter)

app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})
import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import { connectCloudinary } from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';


//App config
const app = express();
const port = process.env.PORT || 5000;

//Connect Database
 connectDB();
 //Connect Cloudenary Here I store all the images
 connectCloudinary();

//Middlewares
app.use(express.json());
app.use(cors());

// api endpoints 
app.use('/api/user', userRouter)


app.get('/', (req, res)=>{
    res.send("Hello");
})

app.listen(port, ()=>{
    console.log(`Server is running http://localhost:${port}`);
})
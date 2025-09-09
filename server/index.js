import express from 'express';
import cors from 'cors';
import 'dotenv/config'


//App config
const app = express();
const port = process.env.PORT || 5000;


app.get('/', (req, res)=>{
    res.send("Hello");
})

app.listen(port, ()=>{
    console.log(`Server is running http://localhost:${port}`);
})
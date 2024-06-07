const express = require('express')
const bodyParser=require('body-parser')
require('dotenv').config();
const port=process.env.port
const userRouter=require("./routes/user")
const app = express()
const connect = require("./config/mongoConnect")
const cors =require('cors')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}))
app.use('/',userRouter);

app.listen(port,()=>{
    console.log('server connected');
})

// Error handling
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
  });
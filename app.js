const express=require('express')
const cors =require('cors')
const { db } =require('./db/db')
const app=express()
const {readdirSync}=require('fs')
const router = express.Router();

require('dotenv').config()
const PORT = process.env.PORT || 3003;

//middleware
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map((route)=>app.use('/api/v1',require('./routes/' + route)))

app.get('/',(req,res)=>{
    res.send("hello");
})

const server =() =>{
    db()
    app.listen(PORT,()=>{
        console.log('listening to port:',PORT);
    })
}
server()

require("dotenv").config();
const express=require('express')
const server=express()
const bodyParser=require('body-parser')

const envPort = process.env.PORT
const PORT = envPort ? envPort : 80
const cors=require('cors')


server.use(cors({origin:"*"}))
server.use(express.json())

server.use(cors())
server.use(bodyParser.json())
server.use('/api',require('./Router/api'))


server.listen(PORT,(err)=>{
    console.log(`Server is running on port: ${PORT}`)
})
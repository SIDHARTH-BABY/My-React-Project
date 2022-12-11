const express = require('express');
require('dotenv').config()
const cors = require('cors')
const app = express()
const dbConfig = require("./config/dbConfig")
app.use(express.json())
const userRoute = require("./routes/userRoute")
const postRoute = require("./routes/postRoute")


app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}))

app.use('/api/user', userRoute)
app.use('/api/post', postRoute)


const port = process.env.PORT || 5000;


console.log(process.env.MONGO_URL);


app.listen(port, () => console.log(`Node server started at port ${port}`));
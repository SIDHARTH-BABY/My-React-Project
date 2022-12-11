const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URl)


const connection = mongoose.connection;

connection.on('connected',()=>{
    console.log('mongodb is connected');
})

connection.on('error',(err)=>{
    console.log('error in mongoDB connection',err);
})

module.exports = mongoose;
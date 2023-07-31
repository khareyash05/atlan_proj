const mongoose = require("mongoose")
const keys = require('../config/keys');
const { url } = keys.database;

const DB = `/${url}`;

mongoose.connect(DB,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{console.log(err);})
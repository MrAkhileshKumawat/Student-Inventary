const mongoose = require("mongoose");

const assert = require("assert");

const db_url = process.env.DB_URL;

/// connection code 

mongoose.connect(db_url , {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
},(err , link)=>{
    if (err) throw err;
    console.log("DB connect success....")
})


const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const Schema =  mongoose.Schema;

const studentSchema = new Schema({
    email:{
        type:String,
        default:"",
        unique:true,
    },
    full_name:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    mobile_number:{
        type:Number,
        required:true,
        min:1000000000,
        max:9999999999
    },
    country:{
        type:String,
        required:true
    }

})

const student_data = mongoose.model("student_data",studentSchema)

const signupSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    }
})

signupSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err); }
      user.password = hash;
      next();
    })
  });

const student_signup = mongoose.model("student_signup",signupSchema)


module.exports={student_data , student_signup}
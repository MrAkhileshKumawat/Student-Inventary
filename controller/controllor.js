const student_signup = require("../model/model").student_signup
const student_data = require("../model/model").student_data
const bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken");
const admin = process.env.ADMIN
const secret_key = process.env.SECRET_KEY



module.exports={
    
    async signup(request , h){
        try {
            let studentSignup = new student_signup(request.payload)
            const result = await studentSignup.save();
            return h.response(result)

        } catch (err) {
            console.log(err)
            return h.response("please fill all the details")
        }
    
    },

    async studentInfo(request , h){
        let token = request.headers.authorization
        if(token!==undefined && token!==""){
            let decode = jwt.verify(token,secret_key)
            
            let check = await student_data.find({email:decode.email})
            if (check.length == 0){
                try {
                    let studentSignup = new student_data(request.payload)
                    studentSignup.email=decode.email
                    const result = await studentSignup.save();
                    return h.response(result)
        
                } catch (err) {
                    console.log(err)
                    return h.response("please fill all the details")
                }
            }else{
                return "user already exists"
            }
            
        }else{
            return "First Login Please"
        }
    },



    async login (request,h){
        const data = await student_signup.find({})
        const user = data.find(data=>data.email==request.payload.email)
        if (user==null){
            return h.response("cannot found user").code(400)
            
        }
        try {
            if (await bcrypt.compare(request.payload.password,user.password)){
                let email={email:request.payload.email}
                
                const token = await jwt.sign(email,secret_key)
                // console.log(token)
                return h.response({success:"login successfully",token:token})
                
            }else{
                return h.response("Not allowed")
            }              
        } catch (error) {
            return (error)
        }
    },


    

    async updateStudentInfo(request,h){
        var token = request.headers.authorization
        if(token !== undefined){
            // console.log(request.payload.email)
            if(request.payload.email == undefined ){
                var decode = jwt.verify(token,secret_key)
                var query = {email:decode.email} 
                var data = await student_data.find(query)
                if (data.length !== 0){
                    await student_data.findOneAndUpdate(query,request.payload)
                    return h.response("Updated")

                }else{
                    return h.response("User not exists").code(404)
                }
            }else{
                return "Email Cannot Change"
            }
            

        }else{
            return h.response({ERROR:"Please Login"}).code(401)
        }

    },

    async passwordUpdate(request,h){
        var token = request.headers.authorization
        if(token !== undefined){
            var decode = jwt.verify(token,secret_key)
            // console.log(decode
            if (decode.email == request.params.email || decode.email==admin ){
                if(request.payload.email == undefined){
                    var query = {email:request.params.email}
                    var password = request.payload.password
                    const hash = bcrypt.hashSync(password, 10);
                    var update = {$set:{password:hash}}
                    var doc = await student_signup.findOneAndUpdate(query,update)
                    return "Password Update Successfully"

                }else{
                    return "cannot change email"
                }
               
            }else{
                return "You are not an admin"
            }
        }else{
            return h.response({ERROR:"Please Login"}).code(401)
        }
    },


    async getstudentInfo(request,h){
        var token = request.headers.authorization
        if(token !== undefined){
            var decode = jwt.verify(token , secret_key)
            // console.log(decode)
            var data = await  student_signup.find({username:decode.username})
            // console.log(data)
            if (data.length !== 0){
                var stu_detail = await student_data.find({})
                return stu_detail
            }else{
                return "Please signup first"
            }            
        }else{
            return "Please login first"
        }

    },



}
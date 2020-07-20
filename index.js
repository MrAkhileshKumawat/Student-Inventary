"use strict";

require('dotenv').config();


const Hapi = require('hapi');



// const student_detail=new student_detail({
//     full_name:request.payload.full_name,
//     email:request.payload.email,
//     username:request.payload.username,
//     password:request.payload.password,
//     dob:request.payload.dob,
//     gender:request.payload.gender,
//     country:request.payload.country,
//     mobile_number:request.payload.mobile_number
// })

const routes = require("./routes")

const init = async ()=>{

    const database = require("./database")

    


    const server = new Hapi.Server({
        host:'localhost',
        port:process.env.PORT
    });

    

    server.route({
        method:'GET',
        path:'/',
        handler:(request , h)=>{
            
            return h.response("Welcome")
        }
    })

    server.route({
        method:"GET",
        path:"/students",
        handler:routes.getstudentInfo
    })

    server.route({
        method:'POST',
        path:'/signup',
        handler:routes.signup
    });

    server.route({
        method:'POST',
        path:'/login',
        handler:routes.login
    })

    server.route({
        method:'POST',
        path:'/profile',
        handler:routes.studentInfo
    });


    server.route({
        method:"PUT",
        path:"/update/profile",
        handler:routes.updateStudentInfo
    })

    server.route({
        method:"PUT",
        path:"/update/{email}",
        handler:routes.passwordUpdate
    })



    // process.on('unhandledRejection', (err) => {

    //     console.log(err);
    //     process.exit(1);
    // });

    server.start();
    console.log("server is running",server.info.uri)

} 

init();


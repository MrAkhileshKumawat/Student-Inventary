"use strict";

require('dotenv').config();


const Hapi = require('hapi');


const routes = require("./controller/controllor")

const init = async ()=>{

    const database = require("./model/database")

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


    server.start();
    console.log("server is running",server.info.uri)

} 

init();


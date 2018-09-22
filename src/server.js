// Importing Hapi which is framwork of node.js
import Hapi from 'hapi';
// Importing inert it's a module for handle static file and directory 
import Inert from 'inert';
// Importing Vision Templates rendering plugin support for hapi.js.
import Vision from 'vision';

import jwt from 'jsonwebtoken'

// Importing routes from signup.js
import routes from './signup';
// Importing routes form login.js
import login from './login';

import check_validation from './check.js';

import batch_student from './batch&student_managment'

import state_area_center from './state_area_center'

import TeacherSelectBatch from './TSB'



const server = new Hapi.Server();
// creating a server with port 8080 Because it will run on local system if you are using VPS server then set it on 80 which by default

const port = process.env.PORT || 8000;

server.connection( {
    port: port,
    routes: { cors: true }
});


server.register([
    Inert,
    Vision,
    {
        register:require('hapi-swagger')
    }],
    function(err){
    if(err){
        server.log(['error'], 'hapi-swagger load error: ' + err)
    }
    else{
    }
        server.log(['start'], "hapi-swagger interface loaded!")
});

server.route({

    method: 'GET',
    path: '/hello',
    handler: ( request, reply ) => {
        reply( 'Hello World!' );
    }

});

server.register(require('hapi-auth-cookie'), (err)=>{
  server.auth.strategy('restricted', 'cookie',{
    ttl: 24 * 60 * 60 * 1000, 
    password: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',
    cookie: 'checkin_cookie',
    isSecure: false, 
    redirectTo: '/login'
  });
})


server.state('session', {
  ttl: 24 * 60 * 60 * 1000,
  isHttpOnly: false,
  encoding: 'none',
  isSecure: process.env.NODE_ENV == 'production',
  path: '/deshboard',
  strictHeader: true
});

server.register( require( 'hapi-auth-jwt' ), ( err ) => {
    server.auth.strategy( 'token', 'jwt', {

        key: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',

        verifyOptions: {
            algorithms: [ 'HS256' ],
        }

    } );
    // We move this in the callback because we want to make sure that the authentication module has loaded before we attach the routes. It will throw an error, otherwise.
    server.route(routes)
    server.route(login)
    server.route(batch_student)
    server.route(check_validation)
    server.route(state_area_center)
    server.route(TeacherSelectBatch)

} );

module.exports = server;

server.views({
    engines: {
        html: require('handlebars')
    },
    path: 'view',
    layout: 'layout'
})



server.route({
path: '/{path*}',
method: "GET",

handler: {
    directory: {
        path: 'view',
        listing: true,

    }
}

});

server.start(err => {

    if (err) {

        // Fancy error handling here
        console.error( 'Error was handled!' );
        console.error( err );

    }

    console.log( `Server started at ${ server.info.uri }` );

});
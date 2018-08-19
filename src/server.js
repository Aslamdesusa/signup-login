// Importing Hapi which is framwork of node.js
import Hapi from 'hapi';
// Importing inert it's a module for handle static file and directory 
import Inert from 'inert';
// Importing Vision Templates rendering plugin support for hapi.js.
import Vision from 'vision';



// Importing routes from signup.js
import routes from './signup';
// Importing routes form login.js
import login from './login';



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
  server.auth.strategy('session', 'cookie',{
    ttl: 24 * 60 * 60 * 1000, 
    password: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',
    cookie: 'session-cookie',
    isSecure: false, 
    redirectTo: '/'
  });
})


server.state('session', {
  ttl: 24 * 60 * 60 * 1000,
  isHttpOnly: false,
  encoding: 'none',
  isSecure: process.env.NODE_ENV == 'production',
  path: '/',
  strictHeader: true
});

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

server.route(routes)
server.route(login)



server.start(err => {

    if (err) {

        // Fancy error handling here
        console.error( 'Error was handled!' );
        console.error( err );

    }

    console.log( `Server started at ${ server.info.uri }` );

});
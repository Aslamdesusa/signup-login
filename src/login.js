import Hapi from 'hapi';
const adminModal = require('../tables/loginAdmin.js')
const Joi = require('joi')
const AuthCookie = require('hapi-auth-cookie')

// const config = require('../config.json');

// const parser = require('body-parser');

// const request = require('request');
// const jwkToPem = require('jwk-to-pem');
// const jwt = require('jsonwebtoken');

const routes = [
	{
		method: 'GET',
		path: '/forgot-password',
		handler: function(request, reply){
			return reply.view('forgot-password', null,{layout: 'layout1'})
		}
	},
	{
		method: 'GET',
		path: '/login',
		handler: function(request, reply){
			return reply.view('login', null,{layout: 'layout1'})
		}
	},
	{
		method: 'GET',
		path: '/deshboard/teacher',
		handler: function(request, reply){
			return reply.view('deshboard1', null,{layout: 'layout2'})
		}
	},
	{
		method: 'GET',
		path: '/err',
		handler: function(request, reply){
			return reply.view('login', { message: 'The User credentials you have entered is invalid Please Try Again', success: 'Error!', alert: 'alert-danger'}, {layout: 'layout1'})
		}
	},
	{
		method: 'POST',
		path: '/create/admin',
		handler: function(request, reply){
			const newAdmin = new adminModal({
				"username": request.payload.username, 
				"password": request.payload.password,
				"Admin": request.payload.Admin,
				"Center": request.payload.Center,
				"isLogin": false,
			})
			newAdmin.save(function(err, data){
				if (err) {
					throw err
				}else{
					reply(data)
				}
			})
		}
	},
	{
    method:'POST',
    path:'/admin/login',
    config:{
        validate: {
         	payload:{
         		username:Joi.string().required(),
         		password:Joi.string().required(),

			}
		},
    },
    handler: function(request, reply){
    	
        adminModal.find({'username': request.payload.username, 'password': request.payload.password, }, function(err, data){
            if (err){
                throw err
            } else if (data.length == 0){
            	console.log('err')
            	return reply.redirect('/err?username='+request.payload.username+'&password='+request.payload.password )
            } else if (data[0].Admin == true) {
            	console.log(data[0]._id)
            	request.cookieAuth.set(data[0]);
            	return reply.redirect('/deshboard?uuid='+data[0]._id)
            }else{
            	adminModal.findOneAndUpdate({'username': request.payload.username, 'password': request.payload.password,},{isLogin: true}, function(error, datap){
            		if (error) {
            			throw error
            		}else{
            			request.cookieAuth.set(data[0]);
            			return reply.redirect('/deshboard/teacher?uuid='+data[0]._id)
            		}
            	})
            }
	        })

	    }
	},
	{
		method: 'GET',
		path: '/logout',
		config:{
		    auth:{
		    	strategy: 'restricted',
		    }
		},
		handler: function(request, reply){
			var auth = request.auth.credentials._id;
			console.log(auth)
			adminModal.findOneAndUpdate({_id: auth}, {isLogin: false}, function(err, data){
				if (err) {
					throw err
				}else{
					request.cookieAuth.clear();
					return reply.redirect('/login')
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/{username}',
		handler: function(request, reply){
			return reply.view('404')
		}
	}
]
export default routes;
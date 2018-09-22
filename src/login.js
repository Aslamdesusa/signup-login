import Hapi from 'hapi';
const adminModal = require('../tables/loginAdmin.js')
const Joi = require('joi')
const AuthCookie = require('hapi-auth-cookie')
const centerModal = require('../tables/center')

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
		path: '/deshboard1',
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
		method: 'GET',
		path: '/moderators',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var centerAu = {}
			var adminAu = {} 
			centerModal.find({}, function(err, data){
				if (err) {
					reply(err)
				}else{
					centerAu = data
				}
			})	
			adminModal.find({}, function(err, data){
				if (err) {
					reply(err)
				}else{
					adminAu = data
					return reply.view('moderator', {center: centerAu, admin: adminAu});
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/admin/teacher/management/error',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			adminModal.find({}, function(err, data){
				if (err) {
					reply(err)
				}else{
					return reply.view(
						'moderator', {
							data: data, 
							message: 'This ' +request.query.moderator+ ' already exist.', success: 'Error!', alert: 'alert-danger'
						});
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/admin/teacher/management',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			adminModal.find({}, function(err, data){
				if (err) {
					reply(err)
				}else{
					return reply.view(
						'moderator', {
							data: data, 
							message: 'A ' +request.query.moderator+ ' has been successfully Created.', success: 'Success!', alert: 'alert-success' 
						});
				}
			})
		}
	},
	{
		method: 'POST',
		path: '/create/moderator',
		config:{
		    auth:{
		    	strategy: 'restricted',
		    }
		},
		handler: function(request, reply){
			const newAdmin = new adminModal({
				"firstName": request.payload.firstName,
				"lastName": request.payload.lastName,
				"username": request.payload.username, 
				"password": request.payload.password,
				"moderator": request.payload.moderator,
				"centerHeadPlace": request.payload.centerHeadPlace,
				"isLogin": false,
			})
			newAdmin.save(function(err, data){
				if (err) {
					return reply.redirect('/admin/teacher/management/error?moderator='+request.payload.moderator)
				}else{
					return reply.redirect('/admin/teacher/management?moderator='+request.payload.moderator)
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
            } else if (data[0].moderator == 'SuperAdmin') {
            	console.log(data[0]._id)
            	request.cookieAuth.set(data[0]);
            	return reply.redirect('/deshboard?uuid='+data[0]._id)
            }else if (data[0].moderator == 'Admin' || data[0].moderator == 'Teacher') {
            	adminModal.findOneAndUpdate({'username': request.payload.username, 'password': request.payload.password,},{isLogin: true}, function(error, datap){
            		if (error) {
            			reply(error)
            		}else{
            			request.cookieAuth.set(data[0]);
            			return reply.redirect('/deshboard1?moderator='+data[0].moderator+'&id='+data[0]._id)
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
			var auth = request.auth.credentials;
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
	},
	// {
	// 	method: 'GET',
	// 	path: '/teacher/status',
	// 	handler: function(request, reply){
	// 		adminModal.find({Admin: false}, function(err, data){
	// 			if (err) {
	// 				reply(err)
	// 			}else{
	// 				reply(data)
	// 			}
	// 		})
	// 	}
	// },
]
export default routes;
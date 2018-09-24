import Hapi from 'hapi';
// const popup = require('popups');
const db = require('../database').db;
const batchModal = require('../tables/batch')
const studentModal = require('../tables/student')
const Joi = require('joi')
const AuthCookie = require('hapi-auth-cookie')
const adminModal = require('../tables/loginAdmin.js')
const centerModal = require('../tables/center')
const nodemailer = require("nodemailer");
const async = require('async')


const routes = [
	{ 
		method: 'GET',
		path: '/',
		handler: function(request, reply){
			return reply.view('login', null, {layout: 'layout1'})
		}
	},
	{
		method: 'GET',
		path: '/deshboard',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			return reply.view('index')
		}
	},
	{
		method: 'GET',
		path: '/batch/management',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var batch = {}
			batchModal.find({}, (err, data) =>{
				if (err) {
					reply(err)
				}else{
					batch = data
					reply.view('batch', {data: batch})
				}
			})

		}
	},
	{
		method: 'GET',
		path: '/center/center',
		handler: function(request, reply){
			var center = {}
			var teacher = {}
			centerModal.find({}, function(err, data){
				if (err) {
					reply(err)
				}else{
					center = data
					reply(center)
				}
			})
			// adminModal.find({moderator: 'Teacher'}, function(err, data){
			// 	if (err) {
			// 		reply(err)
			// 	}else{
			// 		teacher = data
			// 		reply({
			// 			message: 'success',
			// 			center: center,
			// 			teacher: teacher,
			// 		}) 
			// 	}
			// })
		}
	},
	{
		method: 'GET',
		path: '/center/teacher',
		handler: function(request, reply){
			// var center = {}
			var teacher = {}
			// centerModal.find({}, function(err, data){
			// 	if (err) {
			// 		reply(err)
			// 	}else{
			// 		center = data
			// 		reply(center)
			// 	}
			// })
			adminModal.find({moderator: 'Teacher'}, function(err, data){
				if (err) {
					reply(err)
				}else{
					teacher = data
					reply(teacher) 
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/success',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			batchModal.find({}, (err, data) =>{
				if (err) {
					reply(err)
				}else{
					reply.view('batch', {data: data,  message: 'The New Batch has been successfully Created.', success: 'Success!', alert: 'alert-success'})
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/success/deleted',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			batchModal.find({}, (err, data) =>{
				if (err) {
					reply(err)
				}else{
					reply.view('batch', {data: data,  message: 'Record ' +request.query.Name+ ' deleted successfully.', success: 'Delete!', alert: 'alert-success'})
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/error',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			batchModal.find({}, (err, data) =>{
				if (err) {
					reply(err)
				}else{
					reply.view('batch', {data: data, message: 'The Batch ID Already Exist.', success: 'Error!', alert: 'alert-danger'})
				}
			})
		}
	},
	{
		method: 'POST',
		path: '/batch/management',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var newBatch = new batchModal({
                    "Name": request.payload.Name,
                    "ID":request.payload.ID,
                    "Center": request.payload.Center,
                    "StartDate": request.payload.StartDate,
                    "NumberOfClass": 0,
                    "actualClassLimit": request.payload.actualClassLimit,
                    "BatchDay": request.payload.BatchDay,
                    "BatchSchedule": request.payload.BatchSchedule,
                    "isActivate": true,
                    "Teacher": request.payload.Teacher,
           });
			// var newBatch = new batchModal(request.payload);
			newBatch.save(function (err, data){
				if (err) {
					return reply.redirect('/error?ID='+ request.payload.ID)
				}else{
					return reply.redirect('/success?_id='+data._id+ '&Name='+data.Name )
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/batch/management/deleted/{uuid}',
		config: {
		// Joi api validation
			validate: {
			    params: {
			        uuid: Joi.string().required()
			    }
			},
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			batchModal.findOneAndRemove({_id: request.params.uuid}, function (error, data){
				if (error) {
					return reply('Data Didn\'t deleted')
				}else{
					reply.redirect('/success/deleted?_id=' + request.params.uuid + '&Name=' + data.Name)
					// reply('deleted')
				}
			})
		}
	},
// =====================================================================================================
	{
		method: 'GET',
		path: '/student/management',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var student = {}
			var batch = {}
			studentModal.find().limit(100).exec({}, (err, data) =>{
				if (err) {
					reply(err)
				}else{
					student=data
					reply.view('student', {data: student})

				}
			})
		}
	},
	{
		method: 'GET',
		path: '/student/center',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var center = {}
			centerModal.find({}, function(err, data){
				if (err) {
					reply(err)
				}else{
					center = data
					reply(center)
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/student/batch',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var batch = {}
			batchModal.find({}, function(err, data){
				if (err) {
					reply(err)
				}else{
					batch = data
					reply(batch)
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/created/student',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			studentModal.find({}, (err, data) =>{
				if (err) {
					reply(err)
				}else{
					reply.view('student', {data: data,  message: 'The New Student has been successfully Created.', success: 'Success!', alert: 'alert-success'})
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/check-in-out-desh',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			return reply.view('moderatorCheck')
		}
	},
	{
		method: 'GET',
		path: '/student/deleted',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			studentModal.find({}, (err, data) =>{
				if (err) {
					reply(err)
				}else{
					reply.view('student', {data: data,  message: 'Record ' +request.query.Name+ ' deleted successfully.', success: 'Delete!', alert: 'alert-success'})
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/error/student',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			studentModal.find({}, (err, data) =>{
				if (err) {
					reply(err)
				}else{
					reply.view('student', {data: data, message: 'This student ( '+request.query.ID+' ) ID Already Exist Please Try With Another Uniq ID.', success: 'Error!', alert: 'alert-danger'})
				}
			})
		}
	},
	{
		method: 'POST',
		path: '/student/management',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var pins = [
				Math.floor(Math.random() * 85952) + 10000,
				Math.floor(Math.random() * 46546) + 85488,
				Math.floor(Math.random() * 78958) + 10000,
			]
			var transporter = nodemailer.createTransport({
				host: 'smtp.gmail.com',
				port: 587,
				secure: false, // true for 465, false for other ports
				auth: {
				user: 'aslam17@navgurukul.org', // generated ethereal user
				pass: 'aslam#desusa' // generated ethereal password
			}
		});
			var maillist = [
			  request.payload.Email,
			  request.payload.Email1,
			  request.payload.Email2,
			];
		// setup email data with unicode symbols
		var mailOptions = {
	        from: '"UCMAS STUDENT TRACKER " <aslam17@navgurukul.org>', // sender address
	        // to: maillist,  // list of receivers
	        subject: 'UCMAS PIN CODE FOR CHECK-IN CHECK-OUT', // Subject line
	        text: '', // plain text body
	        html: '' // html body
	    };
			var newStudent = new studentModal({
                    "Name": request.payload.Name,
                    "ID":request.payload.ID,
                    "DateOfBirth": request.payload.DateOfBirth,
                    "EnrollDate": request.payload.EnrollDate,
                    "CurrentLevel": request.payload.CurrentLevel,
                    "Center": request.payload.Center,
                    "Batch": request.payload.Batch,
                    "ContactName": request.payload.ContactName,
                    "Mobile": request.payload.Mobile,
                    "Email": request.payload.Email,
                    "ContactName1": request.payload.ContactName1,
                    "Mobile1": request.payload.Mobile1,
                    "Email1": request.payload.Email1,
                    "ContactName2": request.payload.ContactName2,
                    "Mobile2": request.payload.Mobile2,
                    "Email2": request.payload.Email2,
                    "CheckInOut": false,
                    "PinCode": pins,
           });
			var count = 0
			console.log(newStudent)
			studentModal.find({ID: request.payload.ID}, function(err, doc){
				if (doc.length) {
					return reply.redirect('/error/student?ID='+ request.payload.ID)
				}else{
					newStudent.save(function (err, data){
						if (err) {
							// return reply.redirect('/error/student?ID='+ request.payload.ID)
							reply(err)
						}else{
							maillist.forEach(function(email, pin, response){
							    mailOptions["to"] = email;

							    //manipulate the text
						    	mailOptions["text"] = "Thanx to join us Here is your Pin Code and student ID do not forget this pin without this pin you can't be able to Do Check-in and Check-out\n " +'PIN-CODE = '+ pins[count++] +'\n'+ 'STUDENT ID = '+request.payload.ID

							    transporter.sendMail(mailOptions, function(error, response){
							        if(error){
							            console.log(error);
							        }else{
							        	return reply.redirect('/created/student?_id='+data._id+ '&Name='+data.Name )
							        }
							    });
							});	
						}
					})
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/student/management/deleted/{uuid}',
		config: {
		// Joi api validation
			validate: {
			    params: {
			        uuid: Joi.string().required()
			    }
			},
			auth:{
				strategy: 'restricted'
			}
		},
		handler: function(request, reply){
			studentModal.findOneAndRemove({_id: request.params.uuid}, function (error, data){
				if (error) {
					return reply('Data Didn\'t deleted')
				}else{
					reply.redirect('/student/deleted?_id=' + request.params.uuid + '&Name=' + data.Name)
					// reply('deleted')
				}
			})
		}
	},	
	
]
export default routes;
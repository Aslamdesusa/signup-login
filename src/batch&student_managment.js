import Hapi from 'hapi';
// const popup = require('popups');
const db = require('../database').db;
const batchModal = require('../tables/batch')
const studentModal = require('../tables/student')
const Joi = require('joi')
const AuthCookie = require('hapi-auth-cookie')
const adminModal = require('../tables/loginAdmin.js')
const centerModal = require('../tables/center')

const routes = [
	{
		method: 'GET',
		path: '/',
		handler: function(request, reply){
			return reply.view('checkin_validation', null, {layout: 'layout1'})
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
			var center = {}
			var teacher = {}
			var batch = {}
			centerModal.find({}, function(err, data){
				if (err) {
					reply(err)
				}else{
					center = data
				}
			})
			adminModal.find({moderator: 'Teacher'}, function(err, data){
				if (err) {
					reply(err)
				}else{
					console.log(data)
					teacher = data
				}
			})
			batchModal.find({}, (err, data) =>{
				if (err) {
					reply(err)
				}else{
					batch = data
					reply.view('batch', {centerAu : center, data: batch, teacherAu : teacher})
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
			var center = {}
			centerModal.find({}, function(err, data){
				if (err) {
					reply(err)
				}else{
					center = data
				}
			})
			studentModal.find().limit(100).exec({}, (err, data) =>{
				if (err) {
					reply(err)
				}else{
					student=data
				}
			})
			// var batch = {};
			batchModal.find().limit(100).exec({}, (err, data1) =>{
				if (err) {
					reply(err)
				}else{
					batch=data1;
					console.log(student)
					console.log(batch)
					reply.view('student', {data: student, data1: batch, centerAu: center})
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
		path: '/select/batch',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			batchModal.find({}, function(err, data){
				if (err) {
					reply(err)
				}else{
					return reply.view('selectBatch', {data : data})
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/select/{uuid}',
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
			batchModal.findOneAndUpdate({_id: request.params.uuid}, { $inc: {NumberOfClass:1}}, function(err, data){
				if (err) {
					reply(err)
				}else{
					reply(data)
				}
			});
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
			// var newStudent = new studentModal();
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
                    "CheckInOut": false
           });
			studentModal.find({ID: request.payload.ID}, function(err, doc){
				if (doc.length) {
					return reply.redirect('/error/student?ID='+ request.payload.ID)
				}else{
					newStudent.save(function (err, data){
						if (err) {
							// return reply.redirect('/error/student?ID='+ request.payload.ID)
							reply(err)
						}else{
							return reply.redirect('/created/student?_id='+data._id+ '&Name='+data.Name )
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
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
var dateFormat = require('dateformat');
var now = new Date();

var sideTableDataSuperAdmin = ({foldericon: 'fas fa-fw fa-folder', navlinkdropdowntoggle: 'nav-link dropdown-toggle', pages: 'Pages', addDetails: 'Add Details', otherpage: 'Other Pages:', state: 'State', area: 'Area', center: 'Cetner', moderator: 'Moderator', batchmanagement: 'Batch Management', studentManag: 'Student Management', dayendreport: 'Day End Report', absentRecord: 'Absent Record', backDateEntry: 'Back Date Entry'})

var sideTableDataAdmin = ({navlinkdropdowntoggle: 'nav-link dropdown-toggle', foldericon: 'fas fa-fw fa-folder', pages: 'Pages', addDetails: 'Add Details', area: 'Area', center: 'Cetner', batchmanagement: 'Batch Management', studentManag: 'Student Management', dayendreport: 'Day End Report', absentRecord: 'Absent Record'})

var sideTableDataCenterAdmin = ({batchmanagement: 'Batch Management', studentManag: 'Student Management', dayendreport: 'Day End Report', absentRecord: 'Absent Record'})

var sideTableDataTeacher = ({navlink: 'nav-link', batchmanagement: 'Batch Management', studentManag: 'Student Management', AddnewClass: 'Add New Class', dayendreport: 'Day End Report', displaynone: 'd-none'})


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
		path: '/batch/management',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var auth = request.auth.credentials;
			async function GetBatch(){
				await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
				if (auth.moderator == 'SuperAdmin') {
					batchModal.find({})
					.then(function(SuperAdminBatch){
						return reply.view('batch', {data: SuperAdminBatch, sideTableData: sideTableDataSuperAdmin})
					})
				}else if (auth.moderator == 'StateAdmin') {
					batchModal.find({StateName: auth.HeadPlace})
					.then(function(StateAdminBatch){
						return reply.view('batch2', {data: StateAdminBatch, sideTableData: sideTableDataAdmin})
					})
				}else if (auth.moderator == 'CenterAdmin') {
					batchModal.find({Center: auth.HeadPlace})
					.then(function(CenterBatch){
						return reply.view('batch2', {data: CenterBatch, sideTableData: sideTableDataCenterAdmin})
					})
				}else if (auth.moderator == 'Teacher') {
					batchModal.find({Teacher: auth.username})
					.then(function(TeacherBatch){
						return reply.view('batch2', {data: TeacherBatch, sideTableData: sideTableDataTeacher})
					})
				}
			}
			GetBatch()
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
		path: '/all/batch/{stateName}/{AreaName}/{Center}',
		config:{
			validate:{
				params:{
					stateName:Joi.string(),
                    AreaName:Joi.string(),
                    Center:Joi.string()
				}
			},
		},
		handler: function(request, reply){
				var query = {$and:[{StateName:{$regex: request.params.stateName, $options: 'i'}},{AreaName:{$regex: request.params.AreaName, $options: 'i'}},{Center:{$regex: request.params.Center, $options: 'i'}}]}
				console.log(query)
			async function getCollectionBatch() {
				await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
				batchModal.find(query)
				.then(function(result){
					return reply(result)
				})
			}
			getCollectionBatch();
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
					reply.view('batch', {data: data,  message: 'The New Batch has been successfully Created.', success: 'Success!', alert: 'alert-success', sideTableData: sideTableDataSuperAdmin})
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
                    "StateName": request.payload.StateName,
                    "AreaName": request.payload.AreaName,
                    "Center": request.payload.Center,
                    "StartDate": request.payload.StartDate,
                    "NumberOfClass": 0,
                    "actualClassLimit": request.payload.actualClassLimit,
                    "BatchDay": request.payload.BatchDay,
                    "BatchSchedule": request.payload.BatchSchedule,
                    "isActivate": true,
                    "Teacher": request.payload.Teacher,
                    "Date": dateFormat(now, "yyyy-mm-dd"),
                    "Time": dateFormat(now, "jnownownownowmediumTime")
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
		path: '/getting/management/view',
		handler: function(request, reply){
			batchModal.findOne({_id: request.query._id})
			.then(function(result){
				return reply(result)
			})
		}
	},
	{
		method: 'DELETE',
		path: '/batch/management/deleted',
		handler: function(request, reply){
			batchModal.findOneAndRemove({_id: request.query._id})
			.then(function(result){
				return reply(result)
			})
		}
	},
	{
		method: 'DELETE',
		path: '/student/management/delete',
		handler: function(request, reply){
			batchModal.findOneAndRemove({_id: request.query._id})
			.then(function(result){
				return reply(result)
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
			var auth = request.auth.credentials;
			async function GetBatch(){
				await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
				if (auth.moderator == 'SuperAdmin') {
					studentModal.find({})
					.then(function(SuperAdminStudent){
						return reply.view('student', {data: SuperAdminStudent, sideTableData: sideTableDataSuperAdmin})
					})
				}else if (auth.moderator == 'StateAdmin') {
					studentModal.find({State: auth.HeadPlace})
					.then(function(StateAdminStudent){
						return reply.view('student2', {data: StateAdminStudent, sideTableData: sideTableDataAdmin})
					})
				}else if (auth.moderator == 'CenterAdmin') {
					studentModal.find({Center: auth.HeadPlace})
					.then(function(CenterAdminStudent){
						return reply.view('student2', {data: CenterAdminStudent, sideTableData: sideTableDataCenterAdmin})
					})
				}else if (auth.moderator == 'Teacher') {
					batchModal.find({Teacher: auth.username})
					.then(function(result){
						var totalBatch = [];
						var _count = 0;
						async.forEach(result, function(eachBatch){
							studentModal.find({Batch: eachBatch.Name})
							.then(function(batch){
								async.forEach(batch, function(eachbatchs){
									totalBatch.push(eachbatchs)
									console.log(totalBatch)
								})
								if (++_count == result.length) {
									// return reply(totalBatch)
									return reply.view('student2', {data: totalBatch, sideTableData: sideTableDataTeacher})
							}
						})
					})
				})
			}
		}
			GetBatch()
		}
	},
	{
		method: 'GET',
		path: '/getting/student/view',
		handler: function(request, reply){
			studentModal.findOne({_id: request.query._id})
			.then(function(result){
				return reply(result)
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
					reply.view('student', {data: data, sideTableData: sideTableDataSuperAdmin ,message: 'The New Student has been successfully Created.', success: 'Success!', alert: 'alert-success'})
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
			var auth = request.auth.credentials;
			if (auth.moderator == 'SuperAdmin') {
				return reply.view('moderatorCheck', {sideTableData: sideTableDataSuperAdmin})
			}else if (auth.moderator == 'StateAdmin') {
				return reply.view('moderatorCheck', {sideTableData: sideTableDataAdmin})
			}else if (auth.moderator == 'CenterAdmin') {
				return reply.view('moderatorCheck', {sideTableData: sideTableDataCenterAdmin})
			}else if (auth.moderator == 'Teacher') {
				return reply.view('moderatorCheck', {sideTableData: sideTableDataTeacher})
			}	
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
			var arrayOfdetails = [
			{
				"ContactName": request.payload.ContactName,
				"Mobile": request.payload.Mobile,
				"Email": request.payload.Email,
				"pinCode": Math.floor(Math.random() * 85952) + 10000
			},
			{
				"ContactName": request.payload.ContactName1,
				"Mobile": request.payload.Mobile1,
				"Email": request.payload.Email1,
				"pinCode": Math.floor(Math.random() * 78958) + 10000
			},
			{
				"ContactName": request.payload.ContactName2,
				"Mobile": request.payload.Mobile2,
				"Email": request.payload.Email2,
				"pinCode": Math.floor(Math.random() * 46546) + 85488
			},
			]
			var maillist = [
			  request.payload.Email,
			  request.payload.Email1,
			  request.payload.Email2,
			];
			var transporter = nodemailer.createTransport({
				host: 'smtp.gmail.com',
				port: 587,
				secure: false, // true for 465, false for other ports
				auth: {
				user: 'aslam17@navgurukul.org', // generated ethereal user
				pass: 'aslam#desusa' // generated ethereal password
			}
		});
			// setup email data with unicode symbols
		var mailOptions = {
	        from: '"UCMAS STUDENT TRACKER " <aslam17@navgurukul.org>', // sender address
	        // to: maillist,  // list of receivers
	        subject: '[UCMASAustralia] Your Security Pin', // Subject line
	        text: '', // plain text body
	        html: '' // html body
	    };
	    // var details;
	    batchModal.findOne({'Name': request.payload.Batch}, function(err, data){
	    	if (err) {
	    		reply(err)
	    	}else{
	    		// details = data;
	    		 var newStudent = new studentModal({
                    "Name": request.payload.Name,
                    "ID":request.payload.ID,
                    "DateOfBirth": request.payload.DateOfBirth,
                    "EnrollDate": request.payload.EnrollDate,
                    "CurrentLevel": request.payload.CurrentLevel,
                    "State": request.payload.State,
                    "Area": request.payload.Area,
                    "Center": request.payload.Center,
                    "Batch": request.payload.Batch,
                    "BatchDay": data.BatchDay,
                    "CheckInOut": false,
                    "Details": arrayOfdetails,
                    "Date": dateFormat(now, "yyyy-mm-dd"),
                    "Time": dateFormat(now, "mediumTime")
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
						    	mailOptions["text"] = "This is system generated mail. Thank you for joining UCMAS Australia. We take utmost care of your child's security. Please do not share this security Pin with anyone.\n " +'PIN-CODE = '+ arrayOfdetails[count++].pinCode+'\n'+ 'STUDENT ID = '+request.payload.ID

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

	// ==========================================================
	// UPDATE Data
	{
		method: 'GET',
		path: '/getting/batch/for/updatea',
		handler: function(request, reply){
			batchModal.findOne({_id: request.query._id}, request.payload)
			.then(function(result){
				return reply(result)
			})
		}
	},
	{
		method: 'PUT',
		path: '/edit/batch',
		handler: function(request, reply){
			batchModal.findOneAndUpdate({_id: request.query._id}, request.payload)
			.then(function(result){
				return reply(result)
			})
		}
	},
	{
		method: 'GET',
		path: '/getting/student/for/update',
		handler: function(request, reply){
			studentModal.findOne({_id: request.query._id}, request.payload)
			.then(function(result){
				return reply(result)
			})
		}
	},
	{
		method: 'PUT',
		path: '/edit/student/data',
		handler: function(request, reply){
			studentModal.findOneAndUpdate({_id: request.query._id}, request.payload)
			.then(function(result){
				return reply(result)
			})
		}
	},
	{
		method: 'PUT',
		path: '/geting/auth',
		config:{
			auth:{
				strategy: 'restricted'
			}
		},
		handler: function(request, reply){
			var auth = request.auth.credentials.moderator;
			return reply(auth)
		}
	},
	
]
export default routes;
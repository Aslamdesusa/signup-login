'use strict';



import Hapi from 'hapi';
const stateModal = require('../tables/state')
const areaModal = require('../tables/area')
const centerModal = require('../tables/center')
const adminModal = require('../tables/loginAdmin.js')
const batchModal = require('../tables/batch')
const SelectedBatchModal = require('../tables/batchselected')
const check_validation = require('../tables/checkValidation')
const studentModal = require('../tables/student')
const absentModal = require('../tables/absent')
const Joi = require('joi')
var dateFormat = require('dateformat');
var now = new Date();
const async = require('async')

var pdf_table_extractor = require("pdf-table-extractor");
var PDFDocument = require ('pdfkit');
const Json2csvParser = require('json2csv').parse;

var sideTableDataSuperAdmin = ({foldericon: 'fas fa-fw fa-folder', navlinkdropdowntoggle: 'nav-link dropdown-toggle', pages: 'Pages', addDetails: 'Add Details', otherpage: 'Other Pages:', state: 'State', area: 'Area', center: 'Cetner', moderator: 'Moderator', batchmanagement: 'Batch Management', studentManag: 'Student Management', dayendreport: 'Day End Report', absentRecord: 'Absent Record'})

var sideTableDataAdmin = ({navlinkdropdowntoggle: 'nav-link dropdown-toggle', foldericon: 'fas fa-fw fa-folder', pages: 'Pages', addDetails: 'Add Details', area: 'Area', center: 'Cetner', batchmanagement: 'Batch Management', studentManag: 'Student Management', dayendreport: 'Day End Report', absentRecord: 'Absent Record'})

var sideTableDataCenterAdmin = ({batchmanagement: 'Batch Management', studentManag: 'Student Management', dayendreport: 'Day End Report', absentRecord: 'Absent Record'})

var sideTableDataTeacher = ({navlink: 'nav-link', batchmanagement: 'Batch Management', studentManag: 'Student Management', AddnewClass: 'Add New Class', dayendreport: 'Day End Report', displaynone: 'd-none'})



const routes = [
	// ========================================================================/
	// for superAdmin only
	{
		method: 'GET',
		path: '/teacher/select/batch/view',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			reply.view('TeacherSB', {ping: 'No Selected Batch', sideTableData: sideTableDataTeacher})
		}
	},
	{
		method: 'GET',
		path: '/teacher/select/batch',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var auth = request.auth.credentials.username;
			console.log(auth)
			batchModal.find({'Teacher': auth}, (err, data) =>{
				if (err) {
					reply(err)
				}else{
					reply(data)
				}
			})
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
					return reply.view('TeacherSB', {data : data})
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/select/batch/success',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var auth = request.auth.credentials.username
			batchModal.find({Teacher: auth}, function(err, data){
				if (err) {
					reply(err)
				}else{
					return reply.view('TeacherSB', {data : data, message: 'Batch has been Selected.', success: 'Success!', alert: 'alert-success'},{layout: 'layout2'})
				}
			})
		}
	},
	// {
	// 	method: 'GET',
	// 	path: '/teacher/bash',
	// 	config:{
	// 		auth:{
	// 			strategy: 'restricted'
	// 		}
	// 	},
	// 	handler: function(request, reply){
	// 		return reply.view('teachercheck', null, {layout: 'layout2'})
	// 	}
	// },
	// ===============================================
	// Day End Report 
	{
		method: 'GET',
		path: '/get/arae/from/state/{stateName}',
		config:{
			// Joi api validation
			validate: {
			    params: {
			        stateName: Joi.string().required()
			    }
			},
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			areaModal.find({'stateName': request.params.stateName}, function(err, data){
				if (err) {
					reply(err)
				}else{
					reply(data)
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/get/center/from/area/{AreaName}',
		config:{
			// Joi api validation
			validate: {
			    params: {
			        AreaName: Joi.string().required()
			    }
			},
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			centerModal.find({'AreaName': request.params.AreaName}, function(err, data){
				if (err) {
					reply(err)
				}else{
					reply(data)
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/getting/all/batch/{date}/{stateName}/{AreaName}/{Center}',
		config:{
			validate:{
				params:{
					date: Joi.string(),
					stateName:Joi.string(),
                    AreaName:Joi.string(),
                    Center:Joi.string()
				}
			},
		},
		handler: function(request, reply){
			var dayOfWeek = dateFormat(request.params.date, "dddd")
				var query = {$and:[{BatchDay:{$regex: dayOfWeek, $options: 'i'}}, {StateName:{$regex: request.params.stateName, $options: 'i'}},{AreaName:{$regex: request.params.AreaName, $options: 'i'}},{Center:{$regex: request.params.Center, $options: 'i'}}]}
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
		path: '/persent/Batch/{date}/{State}/{Area}/{Center}',
		config:{
			validate:{
				params:{
					date: Joi.string(),
					State:Joi.string(),
                    Area:Joi.string(),
                    Center:Joi.string()
				}
			},
		},
		handler: function(request, reply){
			var query = {$and:[{Date:{$regex: request.params.date, $options: 'i'}},{State:{$regex: request.params.State, $options: 'i'}},{Area:{$regex: request.params.Area, $options: 'i'}}, {Center:{$regex: request.params.Center, $options: 'i'}}]}
				console.log(query)
			async function persentBatch() {
				await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
				SelectedBatchModal.find(query)
				.then(function(result){
					return reply(result)
				})
			}
			persentBatch();
		}
	},
	{
		method: 'GET',
		path: '/getting/all/persent-student/{date}/{stateName}/{AreaName}/{Center}',
		config:{
			validate:{
				params:{
					date: Joi.string(),
					stateName:Joi.string(),
                    AreaName:Joi.string(),
                    Center:Joi.string()
				}
			},
		},
		handler: function(request, reply){
			var dayOfWeek = dateFormat(request.params.date, "dddd")
			console.log(dayOfWeek)
				var query = {$and:[{BatchDay:{$regex: dayOfWeek, $options: 'i'}}, {State:{$regex: request.params.stateName, $options: 'i'}},{Area:{$regex: request.params.AreaName, $options: 'i'}},{Center:{$regex: request.params.Center, $options: 'i'}}]}
			async function getPersentStudent() {
				await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
				studentModal.find(query)
				.then(function(result){
					var totalpersent = [];
					var _count = 0;
					async.forEach(result, function(eachPersentStudent){
						check_validation.find({CheckInDateTime: request.params.date, uuid: eachPersentStudent.ID})
						.then(function(persentStudent){
							async.forEach(persentStudent, function(eachPerset){
								totalpersent.push(eachPerset)
							})
							if (++_count == result.length) {
								return reply(totalpersent)
							}
						})
					})
				});
			}
			getPersentStudent();
		}
	},
	{
		method: 'GET',
		path: '/getting/all/absent-student/{date}/{stateName}/{AreaName}/{Center}',
		config:{
			validate:{
				params:{
					date: Joi.string(),
					stateName:Joi.string(),
                    AreaName:Joi.string(),
                    Center:Joi.string()
				}
			},
		},
		handler: function(request, reply){
			var dayOfWeek = dateFormat(request.params.date, "dddd")
			console.log(dayOfWeek)
				var query = {$and:[{BatchDay:{$regex: dayOfWeek, $options: 'i'}}, {State:{$regex: request.params.stateName, $options: 'i'}},{Area:{$regex: request.params.AreaName, $options: 'i'}},{Center:{$regex: request.params.Center, $options: 'i'}}]}
			async function getPersentStudent() {
				await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
				studentModal.find(query)
				.then(function(result){
					var totalpersent = [];
					var _count = 0;
					async.forEach(result, function(eachPersentStudent){
						absentModal.find({AbsentDate: request.params.date, uuid: eachPersentStudent.ID})
						.then(function(persentStudent){
							async.forEach(persentStudent, function(eachPerset){
								totalpersent.push(eachPerset)
							})
							if (++_count == result.length) {
								return reply(totalpersent)
							}
						})
					})
				});
			}
			getPersentStudent();
		}
	},

	// =======================================
	// getting all batch for center Head
	{
		method: 'GET',
		path: '/getting/all/batch/Center-head/{date}/{Center}',
		config:{
			validate:{
				params:{
					date: Joi.string(),
                    Center:Joi.string()
				}
			}, 
		},
		handler: function(request, reply){
			var dayOfWeek = dateFormat(request.params.date, "dddd")
				var query = {$and:[{BatchDay:{$regex: dayOfWeek, $options: 'i'}},{Center:{$regex: request.params.Center, $options: 'i'}}]}
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
		path: '/persent/Batch/center-head/{date}/{Center}',
		config:{
			validate:{
				params:{
					date: Joi.string(),
                    Center:Joi.string()
				}
			},
		},
		handler: function(request, reply){
			var query = {$and:[{Date:{$regex: request.params.date, $options: 'i'}}, {Center:{$regex: request.params.Center, $options: 'i'}}]}
				console.log(query)
			async function persentBatch() {
				await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
				SelectedBatchModal.find(query)
				.then(function(result){
					return reply(result)
				})
			}
			persentBatch();
		}
	},
	{
		method: 'GET',
		path: '/getting/all/persent-student/center-head/{date}/{Center}',
		config:{
			validate:{
				params:{
					date: Joi.string(),
                    Center:Joi.string()
				}
			},
		},
		handler: function(request, reply){
			var dayOfWeek = dateFormat(request.params.date, "dddd")
			console.log(dayOfWeek)
				var query = {$and:[{BatchDay:{$regex: dayOfWeek, $options: 'i'}}, {Center:{$regex: request.params.Center, $options: 'i'}}]}
			async function getPersentStudent() {
				await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
				studentModal.find(query)
				.then(function(result){
					var totalpersent = [];
					var _count = 0;
					async.forEach(result, function(eachPersentStudent){
						check_validation.find({CheckInDateTime: request.params.date, uuid: eachPersentStudent.ID})
						.then(function(persentStudent){
							async.forEach(persentStudent, function(eachPerset){
								totalpersent.push(eachPerset)
							})
							if (++_count == result.length) {
								return reply(totalpersent)
							}
						})
					})
				});
			}
			getPersentStudent();
		}
	},
	{
		method: 'GET',
		path: '/getting/all/absent-student/center-head/{date}/{Center}',
		config:{
			validate:{
				params:{
					date: Joi.string(),
                    Center:Joi.string()
				}
			},
		},
		handler: function(request, reply){
			var dayOfWeek = dateFormat(request.params.date, "dddd")
			console.log(dayOfWeek)
				var query = {$and:[{BatchDay:{$regex: dayOfWeek, $options: 'i'}}, {Center:{$regex: request.params.Center, $options: 'i'}}]}
			async function getPersentStudent() {
				await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
				studentModal.find(query)
				.then(function(result){
					var totalpersent = [];
					var _count = 0;
					console.log(result)
					async.forEach(result, function(eachPersentStudent){
						absentModal.find({AbsentDate: request.params.date, uuid: eachPersentStudent.ID})
						.then(function(persentStudent){
							async.forEach(persentStudent, function(eachPerset){
								totalpersent.push(eachPerset)
							})
							if (++_count == result.length) {
								return reply(totalpersent)
							}
						})
					})
				});
			}
			getPersentStudent();
		}
	},

	// =================================================
	// End
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
			var studentDetails;
			let authDetails = request.auth.credentials;
			async function getBatchCollection() {
				await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
				batchModal.findOneAndUpdate({_id: request.params.uuid}, { $inc: {NumberOfClass:1}})
				.then(function(result){
					studentModal.find({'State': result.StateName, 'Area': result.AreaName, 'Center':result.Center, 'Batch': result.Name})
					.then(function(studentDoc){
						var _count = 0;
						async.forEach(studentDoc, function(eachStudent){
							const newAbsentRecord = new absentModal({
							    "uuid": eachStudent.ID,
							    "StudentName": eachStudent.Name,
							    "State": eachStudent.State,
							    "Area": eachStudent.Area,
							    "Center": eachStudent.Center,
							    "Batch": eachStudent.Batch,
							    "BatchDay": result.BatchDay,
							    "AbsentDate": dateFormat(now, "yyyy-mm-dd"),
							});
							check_validation.findOne({'uuid': result.ID, 'CheckInDateTime':dateFormat(now, "yyyy-mm-dd")})
							.then(function(eachValidation){
								newAbsentRecord.save()
								console.log('data save')
								if (++_count == studentDoc.length) {
									const newSelected = new SelectedBatchModal({
										"BatchID": result.ID,
										"BatchName": result.Name,
										"Center": result.Center, 
									    "BatchDay": result.BatchDay,
										"ClassAddbyTeacherName": authDetails.firstName + authDetails.lastName,
										"CurrentNumberOfClass": result.NumberOfClass,
										"State": result.StateName,
									    "Area": result.AreaName,
									    "Center": result.Center,
										"Date": dateFormat(now, "yyyy-mm-dd"),
									});
									newSelected.save()
									.then(function(batchResult){
										return reply(batchResult)
									});
								}
							});
						});
					});
				});
			}
			getBatchCollection();
		}
	},
	{
		method: 'GET',
		path: '/selected/{BatchID}',
		config: {
		// Joi api validation
			validate: {
			    params: {
			        BatchID: Joi.string().required()
			    }
			},
			auth:{
				strategy: 'restricted'
			}
		},
		handler: function(request, reply){
			async function GetSelectedData(){
				await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
				batchModal.findOne({'ID': request.params.BatchID})
				.then(function(batch){
					SelectedBatchModal.find({'BatchID': request.params.BatchID}).sort({Date: -1})
					.then(function(result){	
						console.log(batch._id)
						return reply.view('TeacherSB', {result: result, BatchName: result[0].BatchName, toadd: 'To Add New class', clickhere: 'Click Here', dataID: batch._id, sideTableData: sideTableDataTeacher})
					})
				})
			}
			GetSelectedData();
		}
	},
	{
		method: 'GET',
		path: '/getday',
		handler: function(request, reply){
			var date = dateFormat(now, "yyyy-mm-d");
			var day = dateFormat(date, "dddd")
			console.log(date)

			reply(day)
		}
	},
	{
		method: 'POST',
		path: '/download/report/absent/student',
		config:{
			validate:{
				payload:{
					AbsentDate: Joi.string().required()
				}
			}
		},
		handler: function(request, reply){
			async function GetAbsentStudent(){
				await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
				absentModal.find({AbsentDate: request.payload.AbsentDate})
				.then(function(absentStudent){
					return reply(absentStudent)
				})
			}
			GetAbsentStudent()
		}
	},
	{
		method: 'GET',
		path: '/genrate/report/pdf/{AbsentDate}/{fileName}',
		config:{
			validate:{
				params:{
					AbsentDate: Joi.string().required(),
					fileName: Joi.string().required()
				}
			}
		},
		handler: function(request, reply){
    	 	let doc = new PDFDocument();
    	 		async function GetAbsentStudent(){
				await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
				absentModal.find({AbsentDate: request.params.AbsentDate}, { _id: 0, __v: 0 })
				//PDF parsed
				.then(function(result){
					var data;
					data = result
					console.log(typeof data)
					var totalAbsentArray = [];
					var _count = 0;
					totalAbsentArray.push(["Student ID", "Student Name", "Batch", "Center"])
					async.forEach(result, function(eachAbsentStudent){
						var robot = [];
						robot.push(eachAbsentStudent.uuid, eachAbsentStudent.StudentName, eachAbsentStudent.Batch, eachAbsentStudent.Center)
						totalAbsentArray.push(robot)

						if (++_count == result.length) {
							if (request.params.fileName == 'pdf' || request.params.fileName == 'doc') {
								createTable(doc, totalAbsentArray);
								//Setting the width of the table
								function createTable(doc, data, width = 500) {
									const startY = doc.y,
									startX = doc.x,
								    distanceY = 15,
								    distanceX = 10;
								  	doc.fontSize(11);
								  	let currentY = startY;
								  	data.forEach(value => {
							  		let currentX = startX,
							  		size = value.length;
							  		let blockSize = width / size;
							  		value.forEach(text => {
							  		//Write text
							  		doc.text(text, currentX + distanceX, currentY);
							  		//Create rectangles
							  		doc
							  		.lineJoin("miter")
							  		.rect(currentX, currentY, blockSize, distanceY)
						        	.stroke();
						        	currentX += blockSize;
						        });
							  		currentY += distanceY;
							  	});
								  }
								  doc.end();
								  reply(doc)
								  		.header('Content-Disposition', 'attachment; filename=absentRecord.'+request.params.fileName+'');
								  	}
								  	else if (request.params.fileName == 'xlsx' || request.params.fileName == 'csv') {
								  		const fields = ['uuid', 'StudentName', 'State', 'Area', 'Center', 'Batch', 'BatchDay', 'AbsentDate'];
								  		var csv = Json2csvParser(data, { fields });
									console.log(csv);
									return reply(csv)
							  			.header('Content-Disposition', 'attachment; filename=absentRecord.'+request.params.fileName+'');

							}
						}
					});
				});
			}
			GetAbsentStudent()
		}
	},

	
]
export default routes;


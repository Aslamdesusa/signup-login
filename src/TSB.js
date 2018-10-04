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
			reply.view('TeacherSB', {ping: 'No Selected Batch'}, {layout:'layout2'})
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
	{
		method: 'GET',
		path: '/teacher/bash',
		config:{
			auth:{
				strategy: 'restricted'
			}
		},
		handler: function(request, reply){
			return reply.view('teachercheck', null, {layout: 'layout2'})
		}
	},
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
						return reply.view('TeacherSB', {result: result, BatchName: result[0].BatchName, toadd: 'To Add New class', clickhere: 'Click Here', dataID: batch._id}, {layout:'layout2'})
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
	}
]
export default routes;

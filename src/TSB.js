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
					reply.view('TeacherSB', {data: data},{layout:'layout2'})
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
			batchModal.findOneAndUpdate({_id: request.params.uuid}, { $inc: {NumberOfClass:1}}, function(err, data){
				if (err) {
					reply(err)
				}else{
					studentModal.find({'State': data.StateName, 'Area': data.AreaName, 'Center':data.Center, 'Batch': data.Name}, function(err, studentData){
						if (err) {
							reply(err)
						}else{
							studentDetails = studentData
							var studentDetailscopy;
							studentDetails.forEach(function(element){
								const newAbsentRecord = new absentModal({
								    "uuid": element.ID,
								    "StudentName": element.Name,
								    "State": element.State,
								    "Area": element.Area,
								    "Center": element.Center,
								    "Batch": element.Batch,
								    "BatchDay": data.BatchDay,
								    "AbsentDate": dateFormat(now, "yyyy-mm-dd"),
								});
								check_validation.findOne({'uuid': element.ID, 'CheckInDateTime':dateFormat(now, "yyyy-mm-dd")}, function(err, available){
									if (available === null) {
										newAbsentRecord.save()
									}else{
										console.log(available)
									}
								});
							});
						}
					});
					const newSelected = new SelectedBatchModal({
						"BatchID": data.ID,
						"BatchName": data.Name,
						"Center": data.Center, 
					    "BatchDay": data.BatchDay,
						"ClassAddbyTeacherName": authDetails.firstName + authDetails.lastName,
						"CurrentNumberOfClass": data.NumberOfClass,
						"State": data.StateName,
					    "Area": data.AreaName,
					    "Center": data.Center,
						"Date": dateFormat(now, "yyyy-mm-dd"),
					})
					newSelected.save(function(err, data){
						if (err) {
							reply(err)
						}else{
							reply(data)
						}
					});

				}
			});
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

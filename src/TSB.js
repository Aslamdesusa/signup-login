import Hapi from 'hapi';

const stateModal = require('../tables/state')
const areaModal = require('../tables/area')
const centerModal = require('../tables/center')
const adminModal = require('../tables/loginAdmin.js')
const batchModal = require('../tables/batch')
const SelectedBatchModal = require('../tables/batchselected')
const Joi = require('joi')
var dateFormat = require('dateformat');
var now = new Date();


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
					// reply(data)
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
		path: '/getting/all/batch/{stateName}/{AreaName}/{Center}',
		config:{
			validate:{
				params:{
					stateName:Joi.string(),
                    AreaName:Joi.string(),
                    Center:Joi.string()
				}
			},
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var query = {$and:[{StateName:{$regex: request.params.stateName, $options: 'i'}},{AreaName:{$regex: request.params.AreaName, $options: 'i'}},{Center:{$regex: request.params.Center, $options: 'i'}}]}
			console.log(query)
			batchModal.find(query,function(err, data){
				if (err) {
					reply(err)
				}else{
					console.log(data)
					reply(data);
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
			let authDetails = request.auth.credentials;
			batchModal.findOneAndUpdate({_id: request.params.uuid}, { $inc: {NumberOfClass:1}}, function(err, data){
				if (err) {
					reply(err)
				}else{
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
						"Date": dateFormat(now, "yyyy-mm-d"),
					})
					newSelected.save(function(err, data){
						if (err) {
							reply(err)
						}else{
							reply(data)
						}
					})

				}
			});
		}
	},
]
export default routes;

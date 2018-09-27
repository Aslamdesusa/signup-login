import Hapi from 'hapi';

const stateModal = require('../tables/state')
const areaModal = require('../tables/area')
const centerModal = require('../tables/center')
const adminModal = require('../tables/loginAdmin.js')

const routes = [
	// ========================================================================/
	// for superAdmin only
	
	{
		method: 'GET',
		path: '/super/admin/state',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			stateModal.find({}, (err, data) =>{
				if (err) {
					reply(err)
				}else{
					reply.view('state', {data: data})
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/state/ajax',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			stateModal.find({}, (err, data) =>{
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
		path: '/super/admin/state/ajax',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			stateModal.find({}, (err, data) =>{
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
		path: '/day/end/report',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			stateModal.find({}, function(err, data){
				if (err) {
					reply(err)
				}else{
					return reply.view('dayandreport', {data: data})
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/super/admin/area',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var areaAu = {}
			areaModal.find({}, (err, area) =>{
				if (err) {
					reply(err)
				}else{
					areaAu = area
					return reply.view('area', {data: areaAu})
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/super/admin/area/state',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var state = {}
			stateModal.find({}, (err, data)=>{
				if (err) {
					reply(err)
				}else{
					state = data
					reply(state)
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/super/admin/area/area',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var area = {}
			areaModal.find({}, (err, data)=>{
				if (err) {
					reply(err)
				}else{
					area = data
					reply(area)
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/super/admin/center',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var centerau = {}
 			centerModal.find({}, (err, center) =>{
				if (err) {
					reply(err)
				}else{
					centerau = center
					reply.view('center', {center: centerau})
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/success/state',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			stateModal.find({}, (err, data) =>{
				if (err) {
					reply(err)
				}else{
					reply.view('state', {data: data,  message: 'The New State has been successfully Created.', success: 'Success!', alert: 'alert-success'})
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/success/area',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			areaModal.find({}, (err, data) =>{
				if (err) {
					reply(err)
				}else{
					// reply(da)
					reply.view('area', {data: data,  message: 'The New Area has been successfully Created.', success: 'Success!', alert: 'alert-success'})
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/success/center',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			centerModal.find({}, (err, data) =>{
				if (err) {
					reply(err)
				}else{
					reply.view('center', {data: data,  message: 'The New Center has been successfully Created.', success: 'Success!', alert: 'alert-success'})
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/error/state',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			stateModal.find({}, (err, data) =>{
				if (err) {
					reply(err)
				}else{
					reply.view('state', {data: data, message: 'This State Name Already Exist.', success: 'Error!', alert: 'alert-danger'})
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/error/area',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			areaModal.find({}, (err, data) =>{
				if (err) {
					reply(err)
				}else{
					reply.view('area', {data: data, message: 'This Area Name Already Exist.', success: 'Error!', alert: 'alert-danger'})
				}
			})
		}
	},
	{
		method: 'GET',
		path: '/error/center',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			centerModal.find({}, (err, data) =>{
				if (err) {
					reply(err)
				}else{
					reply.view('center', {data: data, message: 'This Center Name Already Exist.', success: 'Error!', alert: 'alert-danger'})
				}
			})
		}
	},
	{
		method: 'POST',
		path: '/add/state',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var newState = new stateModal(request.payload);
			stateModal.find({stateName: request.payload.stateName}, function(err, data){
				if (data.length) {
					return reply.redirect('/error/state?stateName='+ request.payload.stateName)
				}else{
					newState.save(function (err, data){
						if (err) {
							reply(err)
						}else{
							return reply.redirect('/success/state?_id='+data._id+ '&Name='+data.stateName )
						}
					})
				}
			})
		}
	},
	{
		method: 'POST',
		path: '/add/area',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var newArea = new areaModal(request.payload);
			areaModal.find({AreaName: request.payload.AreaName}, function(err, data){
				if (data.length) {
					return reply.redirect('/error/area?Name='+ request.payload.AreaName)
				}else{
					newArea.save(function (err, data){
						if (err) {
							reply(err)
						}else{
							return reply.redirect('/success/area?_id='+data._id+ '&Name='+data.AreaName )
						}
					})
				}
			})
		}
	},
	{
		method: 'POST',
		path: '/add/center',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var newCenter = new centerModal(request.payload);
			centerModal.find({centerName: request.payload.centerName}, function(err, data){
				if (data.length) {
					return reply.redirect('/error/center?Name='+ request.payload.centerName)
				}else{
					newCenter.save(function (err, data){
						if (err) {
							reply(err)
						}else{
							return reply.redirect('/success/center?_id='+data._id+ '&Name='+data.centerName )
						}
					})
				}
			})
		}
	},

]
export default routes;

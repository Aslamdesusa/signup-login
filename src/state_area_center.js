import Hapi from 'hapi';

const stateModal = require('../tables/state')
const areaModal = require('../tables/area')
const centerModal = require('../tables/center')
const adminModal = require('../tables/loginAdmin.js')
const batchModal = require('../tables/batch')


var sideTableDataSuperAdmin = ({foldericon: 'fas fa-fw fa-folder', navlinkdropdowntoggle: 'nav-link dropdown-toggle', pages: 'Pages', addDetails: 'Add Details', otherpage: 'Other Pages:', state: 'State', area: 'Area', center: 'Cetner', moderator: 'Moderator', batchmanagement: 'Batch Management', studentManag: 'Student Management', dayendreport: 'Day End Report', absentRecord: 'Absent Record'})

var sideTableDataAdmin = ({navlinkdropdowntoggle: 'nav-link dropdown-toggle', foldericon: 'fas fa-fw fa-folder', pages: 'Pages', addDetails: 'Add Details', area: 'Area', center: 'Cetner', batchmanagement: 'Batch Management', studentManag: 'Student Management', dayendreport: 'Day End Report', absentRecord: 'Absent Record', displaynone: 'd-none'})

var sideTableDataCenterAdmin = ({batchmanagement: 'Batch Management', studentManag: 'Student Management', dayendreport: 'Day End Report', absentRecord: 'Absent Record'})

var sideTableDataTeacher = ({navlink: 'nav-link', batchmanagement: 'Batch Management', studentManag: 'Student Management', AddnewClass: 'Add New Class', dayendreport: 'Day End Report', displaynone: 'd-none'})

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
					reply.view('state', {data: data, sideTableData: sideTableDataSuperAdmin})
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
			var auth = request.auth.credentials;
			async function getstate() {
				await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
				if (auth.moderator == 'SuperAdmin') {
					stateModal.find({})
					.then(function(result){
						return reply.view('dayandreport', {data: result, sideTableData: sideTableDataSuperAdmin})
					})
				}else if (auth.moderator == 'StateAdmin') {
					stateModal.find({stateName: auth.HeadPlace})
					.then(function(adminstate){
						return reply.view('dayandreport', {data: adminstate, sideTableData: sideTableDataAdmin})
					})
				}else if (auth.moderator == 'CenterAdmin') {
					centerModal.find({centerName: auth.HeadPlace})
					.then(function(adminCenter){
						console.log(adminCenter)
						return reply.view('dayEndReportCenterHead', {data: adminCenter, sideTableData: sideTableDataCenterAdmin})
					})
				}else if (auth.moderator == 'Teacher') {
					batchModal.find({Teacher: auth.username})
					.then(function(TeacherBatch){
						console.log(TeacherBatch)
						return reply.view('DayEndReportForTeacher', {data: TeacherBatch, sideTableData: sideTableDataTeacher})
					})
				}	
			}
			getstate()
		}
	},
	{
		method: 'GET',
		path: '/area/management',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var auth = request.auth.credentials;
			async function GetArea(){
				await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
				if (auth.moderator == 'SuperAdmin') {
					areaModal.find({})
					.then(function(SuperAdminArea){
						return reply.view('area', {data: SuperAdminArea, sideTableData: sideTableDataSuperAdmin})
					})
				}else if (auth.moderator == 'StateAdmin') {
					areaModal.find({stateName: auth.HeadPlace})
					.then(function(StateAdminArea){
						return reply.view('area', {data: StateAdminArea, sideTableData: sideTableDataAdmin})
					})
				}
			}
			GetArea()
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
		path: '/centers/management',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			var auth = request.auth.credentials;
			async function GetCenter(){
				await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
				if (auth.moderator == 'SuperAdmin') {
					centerModal.find({})
					.then(function(SuperAdminCenter){
						return reply.view('center', {center: SuperAdminCenter, sideTableData: sideTableDataSuperAdmin})
					})
				}else if (auth.moderator == 'StateAdmin') {
					centerModal.find({StateName: auth.HeadPlace})
					.then(function(StateAdminCenter){
						return reply.view('center', {center: StateAdminCenter, sideTableData: sideTableDataAdmin})
					})
				}
			}
			GetCenter()
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
					reply(centerau)
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
					reply.view('state', {data: data,  message: 'The New State has been successfully Created.', success: 'Success!', alert: 'alert-success', sideTableData: sideTableDataSuperAdmin})
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
					reply.view('area', {data: data,  message: 'The New Area has been successfully Created.', success: 'Success!', alert: 'alert-success', sideTableData: sideTableDataSuperAdmin})
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
	// =================================================
	{
		method: 'DELETE',
		path: '/delete/Center',
		handler: function(request, reply){
			centerModal.findOneAndRemove({_id: request.query._id})
			.then(function(result){
				return reply(result)
			})
		}
	},
	{
		method: 'DELETE',
		path: '/delete/State',
		handler: function(request, reply){
			stateModal.findOneAndRemove({_id: request.query._id})
			.then(function(result){
				return reply(result)
			})
		}
	},
	{
		method: 'DELETE',
		path: '/delete/area',
		handler: function(request, reply){
			areaModal.findOneAndRemove({_id: request.query._id})
			.then(function(result){
				return reply(result)
			})
		}
	},
	{
		method: 'DELETE',
		path: '/delete/admin',
		handler: function(request, reply){
			adminModal.findOneAndRemove({_id: request.query._id})
			.then(function(result){
				return reply(result)
			})
		}
	},


// ======================================================
// UPDATE STATE AREA Center
	{
		method: 'PUT',
		path: '/edit/state',

		handler: function(request, reply){
			stateModal.findOneAndUpdate({_id: request.query._id}, request.payload)
			.then(function(result){
				return reply(result)
			})
		}
	},
	{
		method: 'PUT',
		path: '/edit/area',
		handler: function(request, reply){
			areaModal.findOneAndUpdate({_id: request.query._id}, request.payload)
			.then(function(result){
				return reply(result)
			})
		}
	},
	{
		method: 'PUT',
		path: '/edit/center',
		handler: function(request, reply){
			centerModal.findOneAndUpdate({_id: request.query._id}, request.payload)
			.then(function(result){
				return reply(result)
			})
		}
	}

]
export default routes;

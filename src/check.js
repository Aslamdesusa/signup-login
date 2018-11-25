import Hapi from 'hapi';
const studentModal = require('../tables/student')
const check_validation = require('../tables/checkValidation')
const Joi = require('joi')
const date = require('date-and-time')
const adminModal = require('../tables/loginAdmin.js')
var dateFormat = require('dateformat');
var now = new Date();

var sideTableDataSuperAdmin = ({foldericon: 'fas fa-fw fa-folder', navlinkdropdowntoggle: 'nav-link dropdown-toggle', pages: 'Pages', addDetails: 'Add Details', otherpage: 'Other Pages:', state: 'State', area: 'Area', center: 'Cetner', moderator: 'Moderator', batchmanagement: 'Batch Management', studentManag: 'Student Management', dayendreport: 'Day End Report', absentRecord: 'Absent Record', backDateEntry: 'Back Date Entry'})

const routes = [
	{
		method: 'GET',
		path: '/check-in-out',
		handler: function(request, reply){
			return reply.view('checkin_validation', null, {layout: 'layout1'})
			// reply(new Date().toString());
		}
	},
	{
		method: 'GET',
		path: '/old-entry-deshboard',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			return reply.view('entry', {sideTableData: sideTableDataSuperAdmin})
			// reply(new Date().toString());
		}
	},
	{
		method: 'POST',
		path: '/entry-on-back-date',
		config:{
			auth:{
				strategy: 'restricted',
			}
		},
		handler: function(request, reply){
			async function postEnetry(){
				await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
				studentModal.findOne({ID: request.payload.ID})
				.then(function(res){
					console.log(res)
					if (res == null) {
						return reply({successMessage: request.payload.ID + " This is not valid Student ID Try with another ID", alert: "danger"})
					}else{
						console.log(res)
						// return reply(res)
						var newEntry = new check_validation({
							"uuid": res.ID,
						    "StudentName": res.Name,
						    "CheckInDateTime": request.payload.CheckInDateTime,
						    "CheckInTime": "N/A",
						    "SigninBy": request.payload.SigninBy,
						    "CheckOutDateTime": request.payload.CheckOutDateTime,
						    "CheckOutTime": "N/A",
						    "SignoutBy": request.payload.SigninBy,
						    "CurrentLevel": res.CurrentLevel,
						    "NumberofRegularClasses": "N/A",
						    "NumberofCatchUpClasses": "N/A",
						    "Medical": "N/A",
						    "StudentStrengthsWeeknesses": "N/A",
						    "FeesPaid": "N/A",
						    "State": res.State,
						    "Area": res.Area,
						    "Center": res.Center,
						    "Batch": res.Batch,
						});
						newEntry.save(function(err, data){
							if (err) {
								throw err
							}else{
								return reply({data: data, status: 200, successMessage: "success", alert: "success"})
							}
						})
					}
				})
			}
			postEnetry()
		}
	},
	{
		method: 'POST',
		path: '/check-in',
		handler: function(request, reply){
			// let payload = request.payload.ID
			let date = new Date().toString();
			// studentModal.findOne()
			const newCheck = new check_validation({
					"uuid": request.payload.ID,
				    "StudentName": data[0].Name,
				    "CheckInDateTime": date,
				    "SigninBy": request.payload.PinCode,
				    "CheckOutDateTime": "Didn't Check out",
				    "CurrentLevel": data[0].CurrentLevel,
				    "NumberofRegularClasses": "N/A",
				    "NumberofCatchUpClasses": "N/A",
				    "Medical": "N/A",
				    "StudentStrengthsWeeknesses": "N/A",
				    "FeesPaid": "N/A",
				})
			studentModal.findOne({'ID': request.payload.ID}, function(err, data){
				if (!data) {
					reply('Invalid Student ID or Security Code. Please Try Again.')
				}else{
					adminModal.findOne({isLogin: data.Center}, function(err, data1){
						if (err) {
							reply(err)
						}else if (data1.isLogin == false) {
							reply('your center is not loged in yet')
						}else if (data.CheckInOut == true) {
							reply('you can\'t check in please check out first')
						}else{
							newCheck.save(function(err, data2){
								if (err) {
									reply(err)
								}else{
									studentModal.findOneAndUpdate({'ID': request.payload.ID}, {CheckInOut: true}, function(err, data3){
										if (err) {
											reply(err)
										}else{
											reply('Check In Successfully\n '+ request.payload.ID +'\n ' + date)
										}
									});
								}
							});
						}
					});
				}
			});
		}
	},
	{
		method: 'POST',
		path: '/check-in/moderator',
		handler: function(request, reply){
			// let payload = request.payload.ID
			let date = new Date().toString();
			var details = {}
			var pincodeData = {}
			studentModal.findOne({'ID': request.payload.ID, 'Details.pinCode': parseInt(request.payload.PinCode)}, function(err, data){
			console.log(data)
			console.log('=========================')
				if (!data) {
					reply('Invalid Student ID or Security Code. Please Try Again.')
				}else if (data.CheckInOut == true) {
					reply('you can\'t check in please check out first')
				}
				else{
					details = data.Details
					for(var i = 0; i < details.length; i++){
						if (details[i].pinCode === parseInt(request.payload.PinCode)) {
							pincodeData = details[i]
							// console.log(details[i])
						}
					}
					const newCheck = new check_validation({
							"uuid": request.payload.ID,
						    "StudentName": data.Name,
						    "CheckInDateTime": dateFormat(now, "yyyy-mm-dd"),
						    "CheckInTime": dateFormat(now, "mediumTime"),
						    "SigninBy": pincodeData.ContactName,
						    "CheckOutDateTime": "Didn't Check out",
						    "CheckOutTime": "Didn't Check out",
						    "SignoutBy": "Didn't sign out",
						    "CurrentLevel": data.CurrentLevel,
						    "NumberofRegularClasses": "N/A",
						    "NumberofCatchUpClasses": "N/A",
						    "Medical": "N/A",
						    "StudentStrengthsWeeknesses": "N/A",
						    "FeesPaid": "N/A",
						    "State": data.State,
						    "Area": data.Area,
						    "Center": data.Center,
						    "Batch": data.Batch
						})
					newCheck.save(function(err, data2){
						if (err) {
							reply(err)
						}else{
							studentModal.findOneAndUpdate({'Details.pinCode': parseInt(request.payload.PinCode)}, {CheckInOut: true}, function(err, data3){
								if (err) {
									reply(err)
								}else{
									reply('Check In Successfully\n '+ request.payload.ID +'\n ' + date)
								}
							});	
						}
					});
				}
			});
		}
	},
	{
		method: 'POST',
		path: '/check-out',
		handler: function(request, reply){
			let date = new Date().toString();
			var details = {}
			var pincodeData = {}
			studentModal.findOneAndUpdate({'Details.pinCode': parseInt(request.payload.PinCode)}, {CheckInOut: false}, function(err, data){
				console.log(data)
				if (!data) {
					reply('Invalid Student ID or Security Code. Please Try Again.')
				}else if (data.CheckInOut == true) {
					details = data.Details
					for(var i = 0; i < details.length; i++){
						if (details[i].pinCode === parseInt(request.payload.PinCode)) {
							pincodeData = details[i]
							console.log(details[i])
						}
					}					
					check_validation.findOneAndUpdate({uuid: request.payload.ID, CheckOutDateTime: "Didn't Check out"}, {CheckOutDateTime: dateFormat(now, "yyyy-mm-dd"), CheckOutTime: dateFormat(now, "mediumTime"), SignoutBy: pincodeData.ContactName}, function(err, data1){
						if (err) {
							throw err
						}else{
							reply('Check out successfully\n '+ request.payload.ID +'\n ' + date)
						}
					})
				}else{
					reply('You can\'t Check out Please do Check in first')
				}
			})
		}
	},
]
export default routes;
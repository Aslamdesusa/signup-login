import Hapi from 'hapi';
const studentModal = require('../tables/student')
const check_validation = require('../tables/checkValidation')
const Joi = require('joi')
const date = require('date-and-time')
const adminModal = require('../tables/loginAdmin.js')

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
		method: 'POST',
		path: '/check-in',
		handler: function(request, reply){
			// let payload = request.payload.ID
			let date = new Date().toString();
			const newCheck = new check_validation({
					
					"uuid": request.payload.ID,
					"CheckInDateTime": date,
					"CheckOutDateTime": "not check-out",
				})
			// studentModal.findOne()
			studentModal.findOne({'ID': request.payload.ID}, function(err, data){
				console.log()
				if (!data) {
					reply('you are not existing student')
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
			// const newCheck = new check_validation({
					
			// 		"uuid": request.payload.ID,
			// 		"PinCode": request.payload.PinCode,
			// 		"CheckInDateTime": date,
			// 		"CheckOutDateTime": "not check-out",
			// 	})
			studentModal.findOne({ID: request.payload.ID, PinCode: request.payload.PinCode}, function(err, data){
				// console.log(request.payload.PinCode)
				console.log(request.payload)
				console.log(data)
				reply(data)
				// if (!data) {
				// 	reply('you are not existing student')
				// }else if (data.CheckInOut == true) {
				// 	reply('you can\'t check in please check out first')
				// }
				// else{
				// 	newCheck.save(function(err, data2){
				// 		if (err) {
				// 			reply(err)
				// 		}else{
				// 			studentModal.findOneAndUpdate({'ID': request.payload.ID}, {CheckInOut: true}, function(err, data3){
				// 				if (err) {
				// 					reply(err)
				// 				}else{
				// 					reply('Check In Successfully\n '+ request.payload.ID +'\n ' + date)
				// 				}
				// 			});	
				// 		}
				// 	});
				// }
			});
		}
	},
	{
		method: 'POST',
		path: '/check-out',
		handler: function(request, reply){
			let date = new Date().toString();
			studentModal.findOneAndUpdate({'ID': request.payload.ID}, {CheckInOut: false}, function(err, data){
				// console.log(data.CheckInOut)
				if (!data) {
					reply('you are not existing student')
				}else if (data.CheckInOut == true) {
						check_validation.findOneAndUpdate({uuid: request.payload.ID, CheckOutDateTime: 'not check-out'}, {CheckOutDateTime: date}, function(err, data1){
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
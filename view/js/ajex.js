$(document).ready(function(){
	$('#CheckIn').click(function(){
		var studentModel = {}
		var ID = $('#uuid').val();
		var PinCode = $('#pincode').val();

		studentModel.ID = ID
		studentModel.PinCode = PinCode
		console.log(studentModel);

			$.ajax({
				url : "/check-in",
				type : "POST",
				data : studentModel,
				success : function(json){
					alert(json);
					location.reload();
				},
				error : function(err){
					alert(err);
				}  
			});
			
		})
});

$(document).ready(function(){
	$('#CheckOut').click(function(){
		var studentModel = {}
		var ID = $('#uuid').val();

		studentModel.ID = ID
		console.log(studentModel);

			$.ajax({
				url : "/check-out",
				type : "POST",
				data : studentModel,
				success : function(json){
					alert(json);
					location.reload();
				},
				error : function(err){
					alert('No internet connection');
				}  
			});
			
		})
});


$(document).ready(function(){
	$('#CheckInMod').click(function(){
		var studentModel = {}
		var ID = $('#uuidmod').val();
		var PinCode = $('#pincode').val();
		var iNumPin = parseInt(PinCode)
		console.log(studentModel)
		if (ID === "") {
			alert("Please Fill ID")
			return false
		}
		if (PinCode === "") {
			alert("Please Fill Security Code")
			return false
		}

		studentModel.ID = ID
		studentModel.PinCode = iNumPin
		console.log(studentModel);

			$.ajax({
				url : "/check-in/moderator",
				type : "POST",
				data : studentModel,
				success : function(json){
					if (json === 'Invalid Student ID or Security Code. Please Try Again.') {
						$('#success-message').empty();
						var HTML = '<div class="alert alert-danger"><strong>Error </strong>' + json+'</div>'
						$('#success-message').append(HTML);
					}else if (json === "you can't check in please check out first") {
						$('#success-message').empty();
						var HTML = '<div class="alert alert-danger"><strong>Error </strong>' + json+'</div>'
						$('#success-message').append(HTML);
					}else{
						$('#success-message').empty();
						var HTML = '<div class="alert alert-success"><strong>Success </strong>' + json+'</div>'
						$('#success-message').append(HTML);
					}

					// location.reload();
				},
				error : function(err){
					alert(err);
				}  
			});
			
		})
});

$(document).ready(function(){
	$('#CheckOutMod').click(function(){
		var studentModel = {}
		var ID = $('#uuidmod').val();
		var PinCode = $('#pincode').val();
		if (ID === "") {
			alert("Please Fill ID")
			return false
		}
		if (PinCode === "") {
			alert("Please Fill Security Code")
			return false
		}
		studentModel.ID = ID
		studentModel.PinCode = PinCode
		console.log(studentModel);
			$.ajax({
				url : "/check-out",
				type : "POST",
				data : studentModel,
				success : function(json){
					if (json === 'Invalid Student ID or Security Code. Please Try Again.') {
						$('#success-message').empty();
						var HTML = '<div class="alert alert-danger"><strong>Error </strong>' + json+'</div>'
						$('#success-message').append(HTML);
					}else if (json === 'You can\'t Check out Please do Check in first') {
						$('#success-message').empty();
						var HTML = '<div class="alert alert-danger"><strong>Error </strong>' + json+'</div>'
						$('#success-message').append(HTML);
					}else{
						$('#success-message').empty();
						var HTML = '<div class="alert alert-success"><strong>Success </strong>' + json+'</div>'
						$('#success-message').append(HTML);
					}
				},
				error : function(err){
					alert('No internet connection');
				}  
			});
			
		})
});


$(document).ready(function(){
	$('#buttonbtn').click(function(){
		var val = $(this).attr("value");
	$('#sele').click(function(){
		$.ajax({
				url : "/select/"+val,
				type : "GET",
				// data : json,
				success : function(success){
					location.reload();
				},
				error : function(err){
					alert(err);
				}  
			});	
		})
	})
			
});
// ================================================
// batch
    
$(document).ready(function(){
    $("#batch").click(function(){
        // alert("The paragraph was clicked.");
  //       $.ajax({
		// 	type: 'GET',
		// 	url: '/center/center',
		// 	dataType: 'json',
		// 	success: function(data){
		// 		// console.log(data[1].centerName)
		// 		var HTML = '';
		// 		for (var i = 0; i < data.length; i += 1) {
	 //            	HTML = '<option value="' + data[i].centerName + '">' + data[i].centerName + '</option>'
		//         	$('#updateoption').append(HTML);
	 //            }     
		//     }
		// });
		$.ajax({
			type: 'GET',
			url: '/center/teacher',
			dataType: 'json',
			success: function(data){
				// console.log(data[1].centerName)
				var HTML = '';
				for (var i = 0; i < data.length; i += 1) {
	            	HTML = '<option value="' + data[i].username + '">' + data[i].firstName + '</option>'
		        	$('#updateoptionteach').append(HTML);
	            }     
		    }
		});
		$.ajax({
			type: 'GET',
			url: '/super/admin/state/ajax',
			dataType: 'json',
			success: function(data){
				// console.log(data[1].centerName)
				var HTML = '';
				for (var i = 0; i < data.length; i += 1) {
	            	HTML = '<option value="' + data[i].stateName + '">' + data[i].stateName + '</option>'
		        	$('#batchstate').append(HTML);
	            }     
		    }
		});
    });
});


$(document).ready(function(){
    $("#batch").click(function(){
        // alert("The paragraph was clicked.");
		$.ajax({
			type: 'GET',
			url: '/super/admin/state/ajax',
			dataType: 'json',
			success: function(data){
				// $('#batchstate').empty();
				// console.log(data[1].centerName)
				var HTML = '';
				for (var i = 0; i < data.length; i += 1) {
	            	HTML = '<option value="' + data[i].stateName + '">' + data[i].stateName + '</option>'
		        	$('#batchstate').append(HTML);
	            }     
		    }
		});
    });
});

$(document).ready(function(){
    $("#studentdata").click(function(){ 
        // alert("The paragraph was clicked.");
        $.ajax({
			type: 'GET',
			url: '/state/ajax',
			dataType: 'json',
			success: function(data){
				// console.log(data[1].centerName)
				// $('#statereport').empty();
				var HTML = '';
				for (var i = 0; i < data.length; i += 1) {
	            	HTML = '<option value="' + data[i].stateName + '">' + data[i].stateName + '</option>'
		        	$('#statereport').append(HTML);
	            }     
		    }
		});
    });
})

$(document).ready(function(){
    $("#areadata").click(function(){
        // alert("The paragraph was clicked.");
        $.ajax({
			type: 'GET',
			url: '/super/admin/area/state',
			dataType: 'json',
			success: function(data){
				// $('#statedata').empty();
				// console.log(data[1].centerName)
				var HTML = '';
				for (var i = 0; i < data.length; i += 1) {
	            	HTML = '<option value="' + data[i].stateName + '">' + data[i].stateName + '</option>'
		        	$('#statedata').append(HTML);
	            }     
		    }
		});
    });
})

$(document).ready(function(){
    $("#centerbutton").click(function(){
        // alert("The paragraph was clicked.");
        $.ajax({
			type: 'GET',
			url: '/super/admin/area/state',
			dataType: 'json',
			success: function(data){
				// $('#statecentere').empty();
				// console.log(data[1].centerName)
				var HTML = '';
				for (var i = 0; i < data.length; i += 1) {
	            	HTML = '<option value="' + data[i].stateName + '">' + data[i].stateName + '</option>'
		        	$('#statecentere').append(HTML);
	            }     
		    }
		});
		$.ajax({
			type: 'GET',
			url: '/super/admin/area/area',
			dataType: 'json',
			success: function(data){
				// $('#areadselect').empty();
				// console.log(data[1].centerName)
				var HTML = '';
				for (var i = 0; i < data.length; i += 1) {
	            	HTML = '<option value="' + data[i].AreaName + '">' + data[i].AreaName + '</option>'
		        	$('#areadselect').append(HTML);
	            }     
		    }
		});
    });
})



// Add New class

$(document).ready(function(){
    $("#selectedBatch").click(function(){
        // alert("The paragraph was clicked.");
        $.ajax({
			type: 'GET',
			url: '/teacher/select/batch',
			dataType: 'json',
			success: function(data){
				$('#BatchSchedule').empty();
				var HTML = '';
				for (var i = 0; i < data.length; i += 1) {
	            	HTML = '<tr><td>'+data[i].Name+'</td><td>3:40</td><td><form action="/selected/'+data[i].ID+'" method="GET"><button class="raisButton" onClick="divFunction()" value="'+data[i].Name+'">Select</button></form></td></tr>'
		        	$('#BatchSchedule').append(HTML);
	            }     
		    }
		});
    });
});


// $(document).ready(function(){
//     $("#buttonbtn").click(function(){
//         var dataId = $(this).attr("value");
//         $.ajax({
// 			type: 'GET',
// 			url: '/select/'+dataId,
// 			dataType: 'json',
// 			success: function(data){
					
// 		    }
// 		});
//     });
// });


// $('table').on('click', '#buttonbtn', function(e){
//         e.preventDefault();
//         var dataId = $(this).attr("value");
//         alert(dataId)
//         // $('#oneBatchselected').empty();
//         // var HTML = '<span>'+val+'</span>'
//         // oneBatchselected
//         // $('#oneBatchselected').append(HTML)

// });



// ====================================================
// day end report



// $(document).ready(function(){
//     $("#areadata").click(function(){
//         // alert("The paragraph was clicked.");
//     });
// })
 
function choice1(select) {
   var val = (select.options[select.selectedIndex].text);
   $.ajax({
		type: 'GET',
		url: '/get/arae/from/state/'+val,
		dataType: 'json',
		success: function(data){
			var desable = '<option value="" disabled selected>Select Area</option>'
			$('#areareport').empty();
			$('#areareport').append(desable)
			var selectedDesable = ''
			var HTML = '';
			for (var i = 0; i < data.length; i += 1) {
            	HTML = '<option value="' + data[i].AreaName + '">' + data[i].AreaName + '</option>'
	        	$('#areareport').append(HTML);
            }     
	    }
	});
}

function choice2(select) {
   var val = (select.options[select.selectedIndex].text);
   $.ajax({
		type: 'GET',
		url: '/get/center/from/area/'+val,
		dataType: 'json',
		success: function(data){
			var desable = '<option value="" disabled selected>Select Center</option>'
			$('#centerreport').empty();
			$('#centerreport').append(desable)
			var HTML = '';
			for (var i = 0; i < data.length; i += 1) {
            	HTML = '<option value="' + data[i].centerName + '">' + data[i].centerName + '</option>'
	        	$('#centerreport').append(HTML);
            }     
	    }
	});
}


function choice4(select) {
   var val = (select.options[select.selectedIndex].text);
   $.ajax({
		type: 'GET',
		url: '/get/center/from/area/'+val,
		dataType: 'json',
		success: function(data){
			// console.log(data[1].centerName)
			// $('#updateoption').empty();
			var HTML = '';
			for (var i = 0; i < data.length; i += 1) {
            	HTML = '<option value="' + data[i].centerName + '">' + data[i].centerName + '</option>'
	        	$('#updateoption').append(HTML);
            }     
	    }
	});
}

function choice3(select) {
   var val = (select.options[select.selectedIndex].text);
   $.ajax({
		type: 'GET',
		url: '/get/arae/from/state/'+val,
		dataType: 'json',
		success: function(data){
			// console.log(data[1].centerName)
	        // $('#batcharea').empty();
			var HTML = '';
			for (var i = 0; i < data.length; i += 1) {
            	HTML = '<option value="' + data[i].AreaName + '">' + data[i].AreaName + '</option>'
	        	$('#batcharea').append(HTML);
            }     
	    }
	});
}


function choice5(select) {
	var selectedState = $("#statereport option:selected").val();
	var selectedArea = $("#areareport option:selected").val();
	var selectedCenter = $("#centerreport option:selected").val();
	// var url = "/getting/all/batch/"+selectedState"/"+selectedArea"/"+selectedCenter
   	// var val = (select.options[select.selectedIndex].text);
   	// alert(selectedCountry)
   	$.ajax({
		type: 'GET',
		url: "/all/batch/"+selectedState+"/"+selectedArea+"/"+selectedCenter,
		dataType: 'json',
		success: function(data){
			console.log(data)
			// $('#batchreport').empty();
			var HTML = '';
			for (var i = 0; i < data.length; i += 1) {
            	HTML = '<option value="' + data[i].Name + '">' + data[i].Name + '</option>'
	        	$('#batchreport').append(HTML);
            }     
	    }
	});
}


function choice6(select) {
	var selectedModreator = $("#moderatorStatus option:selected").val();
	if (selectedModreator === 'SuperAdmin') {
		$('#ifDataAvailable').empty();
		return false
	}else if (selectedModreator === 'StateAdmin') {
		$.ajax({
			type: 'GET',
			url: "/super/admin/area/state",
			dataType: 'json',
			success: function(data){
				console.log(data)
				$('#ifDataAvailable').empty();

				var select = '<label for="inputEmail4">Select State</label><select name="HeadPlace" id="centermod" class="form-control" required><option value="" disabled selected>Select State</option></select>'
				$('#ifDataAvailable').append(select)

				var HTML = '';
				// var lable = ''
				$(HTML).append(select)
				for (var i = 0; i < data.length; i += 1) {
	            	HTML = '<option value="' + data[i].stateName + '">' + data[i].stateName + '</option>'
		        	$('#centermod').append(HTML);
		        	// $('#ifDataAvailable').append(HTML)
	            }     
		    }
		});
		return false
	}else if (selectedModreator === 'CenterAdmin') {
		$.ajax({
			type: 'GET',
			url: "/super/admin/center",
			dataType: 'json',
			success: function(data){
				console.log(data)
				$('#ifDataAvailable').empty();

				var select = '<label for="inputEmail4">Select Center</label><select name="HeadPlace" id="centermod" class="form-control" required><option value="" disabled selected>Select Center</option></select>'
				$('#ifDataAvailable').append(select)

				var HTML = '';
				// var lable = ''
				$(HTML).append(select)
				for (var i = 0; i < data.length; i += 1) {
	            	HTML = '<option value="' + data[i].centerName + '">' + data[i].centerName + '</option>'
		        	$('#centermod').append(HTML);
		        	// $('#ifDataAvailable').append(HTML)
	            }     
		    }
		});
		return false
	}else if (selectedModreator === 'Teacher') {
		$('#ifDataAvailable').empty();
		return false
	}
}
$(document).ready(function(){
	$('#findresult').click(function (event) {
		event.preventDefault();

		// var dateVariable = $.datepicker.parseDate('#DatePincker').val();
		var dateFormat = $('#DatePincker').val();

		console.log(dateFormat)

  		// var datfor = $.format.date(dateVariable, "dd-MM-yy");
		var selectedState = $("#statereport option:selected").val();
		var selectedArea = $("#areareport option:selected").val();
		var selectedCenter = $("#centerreport option:selected").val();

		if (dateFormat === "") {
			alert("Please Select A Date");
			return false;
		}
		if (selectedState === "") {
			alert("Please Select A State");
			return false;
		}
		if (selectedArea === "") {
			alert("Please Select An Area");
			return false;
		}
		if (selectedCenter === "") {
			alert("Please Select A Center");
			return false;
		}

		async function firstRequest() { // Using async function it will wiat till the promise resolves

		  let promise = new Promise((resolve, reject) => {
		    setTimeout(() => resolve(), 1000)
		  });

		  let result = await promise; // wait till the promise resolves (*)

		  $.ajax({
				type: 'GET',
				url: "/getting/all/batch/"+dateFormat+"/"+selectedState+"/"+selectedArea+"/"+selectedCenter,
				dataType: 'json',
				success: function(data){
					if (data.length === 0) {
						$('#BatchSchduled').empty();
						// setTimeout(function(){ location.reload(); }, 5000);
						var HTML = '';
						HTML = '<tr><td colspan="5 style="text-align: center;"><h2 style="color: red; text-align: center; font-size: 18px;">Data is not Available on this date!</h2></td></tr>'
			        	$('#BatchSchduled').append(HTML);
						}else{
						$('#BatchSchduled').empty();
						// location.reload();
						console.log(data)
						var HTML = '';
						for (var i = 0; i < data.length; i += 1) {
							HTML = '<tr><td>'+data[i].Name+'</td><td>'+data[i].BatchSchedule+'</td><td>'+data[i].Teacher+'</td><td>'+data[i].NumberOfClass+'</td><td>'+data[i].actualClassLimit+'</td></tr>'
							$('#BatchSchduled').append(HTML);

							// Second Request
				        	$.ajax({
								type: 'GET',
								url: "/persent/Batch/"+dateFormat+"/"+selectedState+"/"+selectedArea+"/"+selectedCenter,
								dataType: 'json',
								success: function(data){
									console.log(data)
									if (data.length === 0) {
										$('#persentBatch').empty();
										var HTML = '';
										HTML = '<tr><td colspan="3 style="text-align: center;"><h2 style="color: red; text-align: center; font-size: 18px;">Data is not Available on this date!</h2></td></tr>'
							        	$('#persentBatch').append(HTML);
										}else{
										$('#persentBatch').empty();
										var HTML = '';
										for (var i = 0; i < data.length; i += 1) {
							            	HTML = '<tr><td>'+data[i].BatchName+'</td><td>'+data[i].BatchTime+'</td><td>'+data[i].ClassAddbyTeacherName+'</td></tr>'
								        	$('#persentBatch').append(HTML);
							            }
									}
							    }
							});
			            }
					}
			    }
			}); // "done!"
		}
		async function SecondRequest() {

		  let promise = new Promise((resolve, reject) => {
		    setTimeout(() => resolve(), 2000)
		  });

		  let result = await promise; // wait till the promise resolves (*)

		   	// Third Request
	    	$.ajax({
	    		type: 'GET',
	    		url: "/getting/all/persent-student/"+dateFormat+"/"+selectedState+"/"+selectedArea+"/"+selectedCenter,
	    		dataType: 'json',
	    		success: function(data){
	    			console.log(data)
	    			if (data.length === 0) {
	    				$('#persentStudent').empty();
	    				var HTML = '';
	    				HTML = '<tr><td colspan="8 style="text-align: center;"><h2 style="color: red; text-align: center; font-size: 18px;">Data is not Available on this date!</h2></td></tr>'
	    				$('#persentStudent').append(HTML);
	    			}else{
	    				$('#persentStudent').empty();
	    				var HTML = '';
	    				for (var i = 0; i < data.length; i += 1) {
	    					HTML = '<tr><td>'+data[i].uuid+'</td><td>'+data[i].StudentName+'</td><td>'+data[i].Batch+'</td><td>'+data[i].Center+'</td><td>'+data[i].CheckInTime+'</td><td>'+data[i].SigninBy+'</td><td>'+data[i].CheckOutTime+'</td><td>'+data[i].SignoutBy+'</td></tr>'
	    					$('#persentStudent').append(HTML);


	    					
	    					// forth Request
	    					$.ajax({
								type: 'GET',
								url: "/getting/all/absent-student/"+dateFormat+"/"+selectedState+"/"+selectedArea+"/"+selectedCenter,
								dataType: 'json',
								success: function(data){
									console.log(data)
									if (data.length === 0) {
										$('#AbsentStudent').empty();
										var HTML = '';
										HTML = '<tr><td colspan="4 style="text-align: center;"><h2 style="color: red; text-align: center; font-size: 18px;">Data is not Available on this date!</h2></td></tr>'
							        	$('#AbsentStudent').append(HTML);
										}else{
											
										$('#AbsentStudent').empty();
										// console.log(data)
										var HTML = '';
										for (var i = 0; i < data.length; i += 1) {
							            	HTML = '<tr><td>'+data[i].uuid+'</td><td>'+data[i].StudentName+'</td><td>'+data[i].Batch+'</td><td>'+data[i].Center+'</td></tr>'
								        	$('#AbsentStudent').append(HTML);
							            }
									}
							    }
							});
			            }
					}
			    }
			}); // "done!"
		}

		firstRequest();
		SecondRequest();
	});
});


$(document).ready(function(){
	$('#absentrecord').click(function (event) {
		event.preventDefault();
		var absentDate = {};
		// var dateVariable = $.datepicker.parseDate('#DatePincker').val();
		var dateFormat = $('#DatePinckerforAbsent').val();
		absentDate.AbsentDate = dateFormat
		if (dateFormat === "") {
			alert("Please Select A Date");
			return false;
		}
		async function firstRequest() { // Using async function it will wiat till the promise resolves

		  let promise = new Promise((resolve, reject) => {
		    setTimeout(() => resolve(), 1000)
		  });

		  let result = await promise; // wait till the promise resolves (*)

		  $.ajax({
			  	type: 'POST',
				url: "/download/report/absent/student",
				data: absentDate,
				success: function(data){
					console.log(data)
					if (data.length === 0) {
						$('#allAbsentStudent').empty();
						var HTML = '';
						HTML = '<tr><td colspan="4 style="text-align: center;"><h2 style="color: red; text-align: center; font-size: 18px;">Data is not Available on this date!</h2></td></tr>'
			        	$('#allAbsentStudent').append(HTML);
						}else{
							
						$('#allAbsentStudent').empty();
						// console.log(data)
						var HTML = '';
						for (var i = 0; i < data.length; i += 1) {
			            	HTML = '<tr><td>'+data[i].uuid+'</td><td>'+data[i].StudentName+'</td><td>'+data[i].Batch+'</td><td>'+data[i].Center+'</td></tr>'
				        	$('#allAbsentStudent').append(HTML);
			            }
					}
			    }
			});
		}

		firstRequest();
	});
});
  

$(document).ready(function(){

  	$('.close').click(function () {
	 	location.reload();
	 	// alert('dlfj')
	})
  })
  
  $(document).ready(function(){

  	$('#close').click(function () {
	 	location.reload();
	 	// alert('dlfj')
	})
  })


 $(document).ready(function(){
 	$('#pdfGenrator').click(function(){
		var AbsentDate = $('#DatePinckerforAbsent').val();
		var fileName = $("#exportfiletype option:selected").val();
		var me = $(this);
		if (AbsentDate == '') {
			alert('Please Select A Date')
			return false
		}
		if (fileName == '') {
			alert('Please Select File Type')
			return false
		}
		console.log(AbsentDate)
		console.log(fileName)
		$.ajax({
		  	type: 'GET',
			url: "/genrate/report/pdf/"+AbsentDate+"/"+fileName,
			success: function(data){
				console.log(data)
				window.location.href="/genrate/report/pdf/"+AbsentDate+"/"+fileName;
				alert('File Downloaded')
		    }
		});
	})
 });



 $(document).ready(function(){
 	$('#submitModerator').click(function(){
 		var object = {}
		var firstName = $('#inputfirstName').val();
		var lastName = $("#inputLastName").val();
		var email = $("#inputEmail4").val();
		var password = $("#inputPassword4").val();
		var moderatorStatus = $("#moderatorStatus").val();
		var HeadPlace = $("#centermod").val();

		object.firstName = firstName
		object.lastName = lastName
		object.username = email
		object.password = password
		object.moderator = moderatorStatus
		object.HeadPlace = HeadPlace
		if (firstName == '') {
			alert("First Name Shouldn't be empty")
			return false
		}
		if (email == '') {
			alert("User Name Shouldn't be empty")
			return false
		}
		if (password == '') {
			alert("Password Shouldn't be empty")
			return false
		}
		if (moderatorStatus == '') {
			alert("moderator field Shouln't be empty")
			return false
		}
		$.ajax({
			url: "/create/moderator",
			type : "POST",
			data : object,
			success : function(json){
				window.location.href="/admin/teacher/management"
			},
			error : function(err){
				alert(err);
			}  
		});
	})
 })  

  function setInputDate(_id){
    var _dat = document.querySelector(_id);
    var hoy = new Date(),
        d = hoy.getDate(),
        m = hoy.getMonth()+1, 
        y = hoy.getFullYear(),
        data;

    if(d < 10){
        d = "0"+d;
    };
    if(m < 10){
        m = "0"+m;
    };

    data = y+"-"+m+"-"+d;
    console.log(data);
    _dat.value = data;
};

setInputDate("#DatePincker");


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


$(document).ready(function(){
    $(".centerbuttonEdit").click(function(){
        var dataId = $(this).attr("title");
        var centerName = $(this).parents('tr').find("td[id='1']").attr('data-id1');
        var AreaName = $(this).parents('tr').find("td[id='2']").attr('data-id2');
        var StateName = $(this).parents('tr').find("td[id='3']").attr('data-id3');
        var ContactPerson = $(this).parents('tr').find("td[id='4']").attr('data-id4');
        var Email = $(this).parents('tr').find("td[id='5']").attr('data-id5');
        var Mobile = $(this).parents('tr').find("td[id='6']").attr('data-id6');


        var StateOption = '<option value="'+StateName+'" disabled selected>'+StateName+'</option>'
        var AreaOption = '<option value="'+AreaName+'" disabled selected>'+AreaName+'</option>'

        $('#inputState4').empty();
        $('#inputArea4').empty();


        $('input#inputCenter4').val(centerName);
        $('#inputState4').append(StateOption);
        $('#inputArea4').append(AreaOption);
        $('input#inputContactPerson4').val(ContactPerson);
        $('input#inputemail4').val(Email);
        $('input#inputMobile4').val(Mobile);

        $('button#updateCenter').click(function(e){
        	e.preventDefault();
        	var updatedCenterName = $('input#inputCenter4').val(); 
        	var updatedStateName = $('#inputState4 option:selected').val();
        	var UpdatedArea = $('#inputArea4 option:selected').val();
        	var updatedContactPerson = $('input#inputContactPerson4').val();
        	var updatedEmail = $('input#inputemail4').val();
        	var updatedMobile = $('input#inputMobile4').val();

        	updatedetails= {}

        	updatedetails.centerName = updatedCenterName
			updatedetails.AreaName = updatedStateName
			updatedetails.StateName = UpdatedArea
			updatedetails.ContactPerson = updatedContactPerson
			updatedetails.Email = updatedEmail
			updatedetails.Mobile = updatedMobile

			console.log(updatedetails);

			$.ajax({
				url: '/edit/center?_id='+ dataId,
			    type: 'PUT',
			    data: updatedetails,
			    success: function(result) {
			    	console.log("yeah we got it");
			        location.reload();
			    },
				error : function(err){
					alert(err);
				}  
			});
        });
    });
});

// EDIT STATE

$(document).ready(function(){
    $(".statebuttonedit").click(function(){
    	
    	
        var dataId = $(this).attr("title");
        var stateName = $(this).parents('tr').find("td[id='1']").attr('data-id1');
        var AbbrName = $(this).parents('tr').find("td[id='2']").attr('data-id2');
        var ContactPerson = $(this).parents('tr').find("td[id='3']").attr('data-id3');
        var Email = $(this).parents('tr').find("td[id='4']").attr('data-id4');
        var Mobile = $(this).parents('tr').find("td[id='5']").attr('data-id5');

        $('input#inputState4').val(stateName);
        $('input#inputAbbr4').val(AbbrName);
        $('input#inputContactPerson4').val(ContactPerson);
        $('input#inputemail4').val(Email);
        $('input#inputMobile4').val(Mobile);

        console.log(dataId)
        console.log(stateName)
        console.log(AbbrName)
        console.log(ContactPerson)
        console.log(Email)
        console.log(Mobile)



        $('button#updateState').click(function(e){
        	e.preventDefault();
        	var updatedStateName = $('input#inputState4').val();
        	var UpdatedAbbr = $('input#inputAbbr4').val();
        	var updatedContactPerson = $('input#inputContactPerson4').val();
        	var updatedEmail = $('input#inputemail4').val();
        	var updatedMobile = $('input#inputMobile4').val();

        	updateStatedetails= {}

			updateStatedetails.stateName = updatedStateName
			updateStatedetails.Abbr = UpdatedAbbr
			updateStatedetails.contactPerson = updatedContactPerson
			updateStatedetails.Email = updatedEmail
			updateStatedetails.Mobile = updatedMobile

			console.log(updateStatedetails)

			$.ajax({
				url: '/edit/state?_id='+ dataId,
			    type: 'PUT',
			    data: updateStatedetails,
			    success: function(result) {
			    	console.log(result);
			    	console.log('Yeah got it');
			        location.reload();
			    },
				error : function(err){
					alert(err);
				}  
			});
        });
    });
});


// EDIT AREA

$(document).ready(function(){
    $(".editButtonArea").click(function(){
        var dataId = $(this).attr("title");
        var AreaName = $(this).parents('tr').find("td[id='1']").attr('data-id1');
        var stateName = $(this).parents('tr').find("td[id='2']").attr('data-id2');
        var ContactPerson = $(this).parents('tr').find("td[id='3']").attr('data-id3');
        var Email = $(this).parents('tr').find("td[id='4']").attr('data-id4');
        var Mobile = $(this).parents('tr').find("td[id='5']").attr('data-id5');

        var StateOption = '<option value="'+stateName+'" disabled selected>'+stateName+'</option>'

        $('#inputState4').empty();

        $('input#inputArea4').val(AreaName);
        $('#inputState4').append(StateOption);
        $('input#inputContactPerson4').val(ContactPerson);
        $('input#inputemail4').val(Email);
        $('input#inputMobile4').val(Mobile);

        console.log(dataId)
        console.log(AreaName)
        console.log(stateName)
        console.log(ContactPerson)
        console.log(Email)
        console.log(Mobile)



        $('button#updateArea').click(function(e){
        	e.preventDefault();
        	var UpdatedArea = $('input#inputArea4').val();
        	var updatedStateName = $('#inputState4 option:selected').val();
        	var updatedContactPerson = $('input#inputContactPerson4').val();
        	var updatedEmail = $('input#inputemail4').val();
        	var updatedMobile = $('input#inputMobile4').val();

        	updateStatedetails= {}

			updateStatedetails.AreaName = UpdatedArea
			updateStatedetails.stateName = updatedStateName
			updateStatedetails.contactPerson = updatedContactPerson
			updateStatedetails.Email = updatedEmail
			updateStatedetails.Mobile = updatedMobile

			console.log(updateStatedetails)

			$.ajax({
				url: '/edit/area?_id='+ dataId,
			    type: 'PUT',
			    data: updateStatedetails,
			    success: function(result) {
			    	console.log(result);
			    	console.log('Yeah got it');
			        location.reload();
			    },
				error : function(err){
					alert(err);
				}  
			});
        });
    });
});


// EDIT Batch

$(document).ready(function(){
    $(".updateBatch").click(function(){
        var dataId = $(this).attr("title");
        $.ajax({
				url: '/getting/batch/for/updatea?_id='+ dataId,
			    type: 'GET',
			    success: function(result) {
			    	console.log(result)

			    	var optionState = '<option value"'+result.StateName+'" disabled selected>'+result.StateName+'</option>'
			    	var optionArea = '<option value="'+result.AreaName+'" disabled selected>'+result.AreaName+'</option>'
			    	var optionCenter = '<option value="'+result.Center+'" disabled selected>'+result.Center+'</option>'
			    	var optionDay = '<option value="'+result.BatchDay+'" disabled selected>'+result.BatchDay+'</option>'
			    	var optionTeacher = '<option value="'+result.Teacher+'" disabled selected>'+result.Teacher+'</option>'
			    	var dateFormat = result.StartDate.split("-").reverse().join("/") 
					
					console.log(dateFormat)	
					$('#inputState4').empty();
			        $('#inputArea4').empty();
			        $('#inputCenter4').empty();



			    	$('input#inputName4').val(result.Name);
			        $('input#inputID4').val(result.ID);
			        $('#inputState4').append(optionState);
			        $('#inputArea4').append(optionArea);
			        $('#inputCenter4').append(optionCenter);
			    	$('input#inputactualClassLimit4').val(result.actualClassLimit);
			        $('#inputBatchDay4').append(optionDay);
			    	$('input#inputBatchSchedule4').val(result.BatchSchedule);
			        $('#inputTeacher4').append(optionTeacher);
			    	$('input#inputstartdate4').val(result.StartDate).split("-").reverse().join("/");
			    },
			});


        $('button#buttonupdateBatch').click(function(e){
        	e.preventDefault();
        	var UpdatedName = $('input#inputName4').val();
        	var updatedID = $('input#inputID4').val();
        	var updatedState = $('#inputState4 option:selected').val();
        	var updatedArea = $('#inputArea4 option:selected').val();
        	var updatedCenter = $('#inputCenter4 option:selected').val();
        	var updatedactalClass = $('input#inputactualClassLimit4').val();
        	var updatedBatchDay = $('#inputBatchDay4 option:selected').val();
        	var updatedBatchSchedule = $('input#inputBatchSchedule4').val();
        	var updatedTeacher = $('#inputTeacher4 option:selected').val();
        	var updatedStartDate = $('input#inputstartdate4').val();

        	updateStatedetails= {}

			updateStatedetails.Name = UpdatedName
			updateStatedetails.ID = updatedID
			updateStatedetails.StateName = updatedState
			updateStatedetails.AreaName = updatedArea
			updateStatedetails.Center = updatedCenter
			updateStatedetails.actualClassLimit = updatedactalClass
			updateStatedetails.BatchDay = updatedBatchDay
			updateStatedetails.BatchSchedule = updatedBatchSchedule
			updateStatedetails.Teacher = updatedTeacher
			updateStatedetails.StartDate = updatedStartDate

			console.log(updateStatedetails)

			$.ajax({
				url: '/edit/batch?_id='+ dataId,
			    type: 'PUT',
			    data: updateStatedetails,
			    success: function(result) {
			    	console.log(result);
			    	console.log('Yeah got it');
			        location.reload();
			    },
				error : function(err){
					alert(err);
				}  
			});
        });
    });
});


// UPDATING STUDENT DATA
$(document).ready(function(){
    $(".updatemodalstudent").click(function(){
        var dataId = $(this).attr("title");
        var data = $.cookie('checkin_cookie');
        console.log(data)
        alert('Comming Soon.....')
        $.ajax({
				url: '/getting/student/for/update?_id='+ dataId,
			    type: 'GET',
			    success: function(result) {
			    	console.log(result)

			  //   	var optionState = '<option value"'+result.StateName+'" disabled selected>'+result.StateName+'</option>'
			  //   	var optionArea = '<option value="'+result.AreaName+'" disabled selected>'+result.AreaName+'</option>'
			  //   	var optionCenter = '<option value="'+result.Center+'" disabled selected>'+result.Center+'</option>'
			  //   	var optionDay = '<option value="'+result.BatchDay+'" disabled selected>'+result.BatchDay+'</option>'
			  //   	var optionTeacher = '<option value="'+result.Teacher+'" disabled selected>'+result.Teacher+'</option>'
			  //   	var dateFormat = result.StartDate.split("-").reverse().join("/") 
					
					// console.log(dateFormat)	
					// $('#inputState4').empty();
			  //       $('#inputArea4').empty();
			  //       $('#inputCenter4').empty();



			  //   	$('input#inputName4').val(result.Name);
			  //       $('input#inputID4').val(result.ID);
			  //       $('#inputState4').append(optionState);
			  //       $('#inputArea4').append(optionArea);
			  //       $('#inputCenter4').append(optionCenter);
			  //   	$('input#inputactualClassLimit4').val(result.actualClassLimit);
			  //       $('#inputBatchDay4').append(optionDay);
			  //   	$('input#inputBatchSchedule4').val(result.BatchSchedule);
			  //       $('#inputTeacher4').append(optionTeacher);
			  //   	$('input#inputstartdate4').val(result.StartDate).split("-").reverse().join("/");
			    },
			});


   //      $('button#buttonupdateBatch').click(function(e){
   //      	e.preventDefault();
   //      	var UpdatedName = $('input#inputName4').val();
   //      	var updatedID = $('input#inputID4').val();
   //      	var updatedState = $('#inputState4 option:selected').val();
   //      	var updatedArea = $('#inputArea4 option:selected').val();
   //      	var updatedCenter = $('#inputCenter4 option:selected').val();
   //      	var updatedactalClass = $('input#inputactualClassLimit4').val();
   //      	var updatedBatchDay = $('#inputBatchDay4 option:selected').val();
   //      	var updatedBatchSchedule = $('input#inputBatchSchedule4').val();
   //      	var updatedTeacher = $('#inputTeacher4 option:selected').val();
   //      	var updatedStartDate = $('input#inputstartdate4').val();

   //      	updateStatedetails= {}

			// updateStatedetails.Name = UpdatedName
			// updateStatedetails.ID = updatedID
			// updateStatedetails.StateName = updatedState
			// updateStatedetails.AreaName = updatedArea
			// updateStatedetails.Center = updatedCenter
			// updateStatedetails.actualClassLimit = updatedactalClass
			// updateStatedetails.BatchDay = updatedBatchDay
			// updateStatedetails.BatchSchedule = updatedBatchSchedule
			// updateStatedetails.Teacher = updatedTeacher
			// updateStatedetails.StartDate = updatedStartDate

			// console.log(updateStatedetails)

			// $.ajax({
			// 	url: '/edit/batch?_id='+ dataId,
			//     type: 'PUT',
			//     data: updateStatedetails,
			//     success: function(result) {
			//     	console.log(result);
			//     	console.log('Yeah got it');
			//         location.reload();
			//     },
			// 	error : function(err){
			// 		alert(err);
			// 	}  
			// });
   //      });
    });
});


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
						HTML = '<tr><td data-label="" colspan="5 style="text-align: center;"><h2 style="color: red; text-align: center; font-size: 18px;">Data is not Available on this date!</h2></td></tr>'
			        	$('#BatchSchduled').append(HTML);
						}else{
						$('#BatchSchduled').empty();
						// location.reload();
						console.log(data)
						var HTML = '';
						for (var i = 0; i < data.length; i += 1) {
							HTML = '<tr><td data-label="Name">'+data[i].Name+'</td><td data-label="Batch Schedule">'+data[i].BatchSchedule+'</td><td data-label="Teacher">'+data[i].Teacher+'</td><td data-label="Number Of Class">'+data[i].NumberOfClass+'</td><td data-label="Actual Class Limit">'+data[i].actualClassLimit+'</td></tr>'
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
										HTML = '<tr><td data-label="" colspan="3 style="text-align: center;"><h2 style="color: red; text-align: center; font-size: 18px;">Data is not Available on this date!</h2></td></tr>'
							        	$('#persentBatch').append(HTML);
										}else{
										$('#persentBatch').empty();
										var HTML = '';
										for (var i = 0; i < data.length; i += 1) {
							            	HTML = '<tr><td data-label="Batch Name">'+data[i].BatchName+'</td><td data-label="Batch Time">'+data[i].BatchTime+'</td><td data-label="Class Added By">'+data[i].ClassAddbyTeacherName+'</td></tr>'
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
	    				HTML = '<tr><td data-label="" colspan="8 style="text-align: center;"><h2 style="color: red; text-align: center; font-size: 18px;">Data is not Available on this date!</h2></td></tr>'
	    				$('#persentStudent').append(HTML);
	    			}else{
	    				$('#persentStudent').empty();
	    				var HTML = '';
	    				for (var i = 0; i < data.length; i += 1) {
	    					HTML = '<tr><td data-label="ID">'+data[i].uuid+'</td><td data-label="Student Name">'+data[i].StudentName+'</td><td data-label="Batch">'+data[i].Batch+'</td><td data-label="Center">'+data[i].Center+'</td><td data-label="Check In Time">'+data[i].CheckInTime+'</td><td data-label="Sign in By">'+data[i].SigninBy+'</td><td data-label="Check Out Time">'+data[i].CheckOutTime+'</td><td data-label="Sign Out By">'+data[i].SignoutBy+'</td></tr>'
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
										HTML = '<tr><td data-label="" colspan="4 style="text-align: center;"><h2 style="color: red; text-align: center; font-size: 18px;">Data is not Available on this date!</h2></td></tr>'
							        	$('#AbsentStudent').append(HTML);
										}else{
											
										$('#AbsentStudent').empty();
										// console.log(data)
										var HTML = '';
										for (var i = 0; i < data.length; i += 1) {
							            	HTML = '<tr><td data-label="ID">'+data[i].uuid+'</td><td data-label="Student Name">'+data[i].StudentName+'</td><td data-label="Batch">'+data[i].Batch+'</td><td data-label="Center">'+data[i].Center+'</td></tr>'
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
						HTML = '<tr><td data-label="" colspan="4 style="text-align: center;"><h2 style="color: red; text-align: center; font-size: 18px;">Data is not Available on this date!</h2></td></tr>'
			        	$('#allAbsentStudent').append(HTML);
						}else{
							
						$('#allAbsentStudent').empty();
						// console.log(data)
						var HTML = '';
						for (var i = 0; i < data.length; i += 1) {
			            	HTML = '<tr><td data-label="ID">'+data[i].uuid+'</td><td data-label="Student Name">'+data[i].StudentName+'</td><td data-label="Batch">'+data[i].Batch+'</td><td data-label="Center">'+data[i].Center+'</td></tr>'
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

 // $(document).ready(function(){
 // 	$('.DeleteCenter').click(function(e){
 // 		e.preventDefault();

	// 	$.ajax({
	// 		url: "/delete/Center?_id="+,
	// 		type : "POST",
	// 		data : object,
	// 		success : function(json){
	// 			window.location.href="/centers/management"
	// 		},
	// 		error : function(err){
	// 			alert(err);
	// 		}  
	// 	});
	// })
 // })   

 $(document).ready(function(){
	$('.DeleteCenter').click(function(){
		var val = $(this).attr("value");
		var centerName = $(this).attr("title")

		$('.centerName').empty();
		$('.centerName').append(centerName)
		console.log(val)
	$('.DeleteCenterButton').click(function(){
		$.ajax({
				url : "/delete/Center?_id="+val,
				type : "DELETE",
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

 $(document).ready(function(){
	$('.deleteState').click(function(){
		var val = $(this).attr("value");
		var stateName = $(this).attr("title")

		$('.stateName').empty();
		$('.stateName').append(stateName)
		console.log(val)
	$('.DeleteStateButton').click(function(){
		$.ajax({
				url : "/delete/State?_id="+val,
				type : "DELETE",
				success : function(success){
					location.reload();
				},
				error : function(err){
					alert(err);
				}  
			});	
		});
	});
			
});


  $(document).ready(function(){
	$('.DeleteArea').click(function(){
		var val = $(this).attr("value");
		var areaName = $(this).attr("title")
		$('.areaName').empty();
		$('.areaName').append(areaName)
		console.log(val)
	$('.DeleteAreaButton').click(function(){
		$.ajax({
				url : "/delete/area?_id="+val,
				type : "DELETE",
				success : function(success){
					location.reload();
				},
				error : function(err){
					alert(err);
				}  
			});	
		});
	});
			
});


$(document).ready(function(){
	$('.DeleteAdmin').click(function(){
		var val = $(this).attr("value");
		var adminName = $(this).attr("title")

		$('.adminName').empty();
		$('.adminName').append(adminName)
		console.log("/delete/admin?_id="+val)
	$('.DeleteAdminButton').click(function(){
		$.ajax({
				url : "/delete/admin?_id="+val,
				type : "DELETE",
				success : function(success){
					location.reload();
				},
				error : function(err){
					alert(err);
				}  
			});	
		});
	});		
});

$(document).ready(function(){
	$('.DeleteBatch').click(function(){
		var val = $(this).attr("value");
		var adminName = $(this).attr("title")

		$('.BatchName').empty();
		$('.BatchName').append(adminName)
		console.log("/batch/management/deleted?_id="+val)
	$('.DeleteBatchButton').click(function(){
		$.ajax({
				url : "/batch/management/deleted?_id="+val,
				type : "DELETE",
				success : function(success){
					location.reload();
				},
				error : function(err){
					alert(err);
				}  
			});	
		});
	});		
});

$(document).ready(function(){
	$('.DeleteStudent').click(function(){
		var val = $(this).attr("value");
		var adminName = $(this).attr("title")

		$('.StudentName').empty();
		$('.StudentName').append(adminName)
		console.log("/student/management/delete?_id="+val)
	$('.DeleteStudentButton').click(function(){
		$.ajax({
				url : "/student/management/delete?_id="+val,
				type : "DELETE",
				success : function(success){
					location.reload();
				},
				error : function(err){
					alert(err);
				}  
			});	
		});
	});		
});
$(document).ready(function(){
	$('.viewBatchforbatch').click(function(){
		var title = $(this).attr("title");
		$('#modalbodyid').empty();
		$.ajax({
			url : "/getting/management/view?_id="+title,
			type : "GET",
			dataType : 'json',
			success : function(json){
				console.log(json)
				var HTML = '<div id="input"><div class="outer-w3-agile mt-3"><h4 class="tittle-w3-agileits mb-4">Batch View</h4><div class="form-row"><div class="form-group col-md-6"><label for="inputName4"><strong>Name</strong></label><h6>'+json.Name+'</h6></div><div class="form-group col-md-6"><label for="inputID4"><strong>ID</strong></label><h6>'+json.ID+'</h6></div></div><div class="form-row"><div class="form-group col-md-6"><label for="inputState4"><strong>State</strong></label><h6>'+json.StateName+'</h6></div><div class="form-group col-md-6"><label for="inputArea4"><strong>Area</strong></label><h6>'+json.AreaName+'</h6></div></div><div class="form-row"><div class="form-group col-md-6"><label for="inputCenter4"><strong>Center</strong></label><h6>'+json.Center+'</h6></div><div class="form-group col-md-6"><label for="inputstartdate4"><strong>Start Date</strong></label><h6>'+json.StartDate+'</h6></div></div><div class="form-row"><div class="form-group col-md-6"><label for="inputactualClassLimit4"><strong>Actual Class of Limit</strong></label><h6>'+json.actualClassLimit+'</h6></div><div class="form-group col-md-6"><label for="inputactualClassLimit4"><strong>Class taken<strong></label><h6>'+json.NumberOfClass+'</h6></div></div><div class="form-row"><div class="form-group col-md-6"><label for="inputBatchDay4"><strong>Batch Day</strong></label><h6>'+json.BatchDay+'</h6></div><div class="form-group col-md-6"><label for="inputactualClassLimit4"><strong>Created Date</strong></label><h6>'+json.Date+'</h6></div></div><div class="form-row"><div class="form-group col-md-6"><label for="inputBatchSchedule4"><strong>Batch Schedule</strong></label><h6>'+json.BatchSchedule+'</h6></div><div class="form-group col-md-6"><label for="inputTeacher4"><strong>Teacher</strong></label><h6>'+json.Teacher+'</h6></div></div><div class="modal-footer"><button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button></div></div></div>'
				$('#modalbodyid').append(HTML);
			},
			error : function(err){
				alert(err);
			}  
		});
		 
	})
});


$(document).ready(function(){
	$('.studentdataview').click(function(){
		var title = $(this).attr("title");
		$('.modalbodyclass').empty();
		$.ajax({
			url : "/getting/student/view?_id="+title,
			type : "GET",
			dataType : 'json',
			success : function(json){
				console.log(json)
				var HTML = '<div class="outer-w3-agile mt-3"><h4 class="tittle-w3-agileits mb-4">Student Managament Data View</h4><div class="form-row"><div class="form-group col-md-6"><label for="inputName4">Name</label><h6>'+json.Name+'</h6></div><div class="form-group col-md-6"><label for="inputPassword4">ID</label><h6>'+json.ID+'</h6></div></div><div class="form-row"><div class="form-group col-md-6"><label for="inputEmail4">Date Of Birth</label><h6>'+json.DateOfBirth+'</h6></div><div class="form-group col-md-6"><label for="inputPassword4">Enroll Date</label><h6>'+json.EnrollDate+'</h6></div></div><div class="form-row"><div class="form-group col-md-6"><label for="inputEmail4">Current Level</label><h6>'+json.CurrentLevel+'</h6></div><div class="form-group col-md-6"><label for="inputEmail4">State</label><h6>'+json.State+'</h6></div></div><div class="form-row"><div class="form-group col-md-6"><label for="inputEmail4">Area</label><h6>'+json.Area+'</h6></div><div class="form-group col-md-6"><label for="inputEmail4">Center</label><h6>'+json.Center+'</h6></div></div><div class="form-row"><div class="form-group col-md-6"><label for="inputEmail4">Batch</label><h6>'+json.Batch+'</h6></div></div><div class="form-row"><div class="form-group col-md-4"><label for="inputCity">Contect Name</label><h6>'+json.Details[0].ContactName+'</h6></div><div class="form-group col-md-4"><label for="inputState"> Mobile </label><h6>'+json.Details[0].Mobile+'</h6></div><div class="form-group col-md-4"><label for="inputZip">Email</label><h6>'+json.Details[0].Email+'</h6></div></div><div class="form-row"><div class="form-group col-md-4"><label for="inputCity">Secondary Contect Name</label><h6>'+json.Details[1].ContactName+'</h6></div><div class="form-group col-md-4"><label for="inputState">Mobile</label><h6>'+json.Details[1].Mobile+'</h6></div><div class="form-group col-md-4"><label for="inputZip">Email</label><h6>'+json.Details[1].Email+'</h6></div></div><div class="form-row"><div class="form-group col-md-4"><label for="inputCity">Contect Name</label><h6>'+json.Details[2].ContactName+'</h6></div><div class="form-group col-md-4"><label for="inputState"> Mobile </label><h6>'+json.Details[2].Mobile+'</h6></div><div class="form-group col-md-4"><label for="inputZip">Email</label><h6>'+json.Details[2].Email+'</h6></div></div><div class="form-row"><div class="form-group col-md-6"><label for="inputCity">Created Date</label><h6>'+json.Date+'</h6></div></div><div class="modal-footer"><button class="btn btn-secondary" id="close" type="button" data-dismiss="modal">Cancel</button></div></div>'
				$('.modalbodyclass').append(HTML);
			},
			error : function(err){
				alert(err);
			}  
		});
		 
	})
});

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

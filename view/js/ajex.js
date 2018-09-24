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

		studentModel.ID = ID
		studentModel.PinCode = iNumPin
		console.log(studentModel);

			$.ajax({
				url : "/check-in/moderator",
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
	$('#CheckOutMod').click(function(){
		var studentModel = {}
		var ID = $('#uuidmod').val();
		var PinCode = $('#pincode').val();

		studentModel.ID = ID
		studentModel.PinCode = PinCode
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
	$('.select').click(function(){
		var val = $(this).attr("value");
	$('#sele').click(function(){
		$.ajax({
				url : "/select/"+val,
				type : "GET",
				// data : json,
				success : function(success){
					window.location = '/select/batch/success'
				},
				error : function(err){
					alert(err);
				}  
			});	
		})
	})
			
});

    
$(document).ready(function(){
    $("#batch").click(function(){
        // alert("The paragraph was clicked.");
        $.ajax({
			type: 'GET',
			url: '/center/center',
			dataType: 'json',
			success: function(data){
				// console.log(data[1].centerName)
				var HTML = '';
				for (var i = 0; i < data.length; i += 1) {
	            	HTML = "<option value="+data[i].centerName+">" + data[i].centerName +"</option>"
		        	$('#updateoption').append(HTML);
	            }     
		    }
		});
		$.ajax({
			type: 'GET',
			url: '/center/teacher',
			dataType: 'json',
			success: function(data){
				// console.log(data[1].centerName)
				var HTML = '';
				for (var i = 0; i < data.length; i += 1) {
	            	HTML = "<option value="+data[i].firstName + data[i].lastName+">" + data[i].firstName + data[i].lastName +"</option>"
		        	$('#updateoptionteach').append(HTML);
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
			url: '/student/center',
			dataType: 'json',
			success: function(data){
				// console.log(data[1].centerName)
				var HTML = '';
				for (var i = 0; i < data.length; i += 1) {
	            	HTML = "<option value="+data[i].centerName+">" + data[i].centerName +"</option>"
		        	$('#centerdata').append(HTML);
	            }     
		    }
		});
		$.ajax({
			type: 'GET',
			url: '/student/batch',
			dataType: 'json',
			success: function(data){
				// console.log(data[1].centerName)
				var HTML = '';
				for (var i = 0; i < data.length; i += 1) {
	            	HTML = "<option value="+ data[i].Name+">" + data[i].Name +"</option>"
		        	$('#batchdata').append(HTML);
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
				// console.log(data[1].centerName)
				var HTML = '';
				for (var i = 0; i < data.length; i += 1) {
	            	HTML = "<option value="+data[i].stateName+">" + data[i].stateName +"</option>"
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
				// console.log(data[1].centerName)
				var HTML = '';
				for (var i = 0; i < data.length; i += 1) {
	            	HTML = "<option value="+data[i].stateName+">" + data[i].stateName +"</option>"
		        	$('#statecentere').append(HTML);
	            }     
		    }
		});
		$.ajax({
			type: 'GET',
			url: '/super/admin/area/area',
			dataType: 'json',
			success: function(data){
				// console.log(data[1].centerName)
				var HTML = '';
				for (var i = 0; i < data.length; i += 1) {
	            	HTML = "<option value="+data[i].AreaName+">" + data[i].AreaName +"</option>"
		        	$('#areadselect').append(HTML);
	            }     
		    }
		});
    });
})

$(document).ready(function(){
	// $('#BatchModal').modal({ backdrop: 'static', keyboard: false });

  	$('.close').click(function () {
	 	location.reload();
	 	// alert('dlfj')
	})
  })
  
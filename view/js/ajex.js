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

// $(document).ready(function){
// 	$('#batch').click(function(){
// 		alert('skdjf');
// 		console.log('hello I m here')
// 	})
// }
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

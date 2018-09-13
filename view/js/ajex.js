$(document).ready(function(){
	$('#CheckIn').click(function(){
		var studentModel = {}
		var ID = $('#uuid').val();

		studentModel.ID = ID
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

		studentModel.ID = ID
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

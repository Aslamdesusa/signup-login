<!-- sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000 -->


<!-- Today Changes  -->
CHANGE

<!-- add one more field field will be like password  --> Completed

<!-- when enter student data  in the field and they will get a pincode on both email with diffrent pincode   --> Completed

<!-- if anyone forgot his pincode then center head and admin can change his pincode with reset botton which is be on edit part  -->

<!-- if any teacher login then he can look only his data with there email and password --> Completed

<!-- add new class --> Completed

<!-- add one more field with timing on add new class page --> Completed





<!-- first priority is add new class wla work --> Completed
<!--  -->
<!-- the second priority is student management with ganrate pin --> Completed


<!-- and the forth priority is fix the all UI  --> Completed

<!-- day end report is not completed yet-->

<!-- change the button value with add class -->

<!-- you are about to add a new class  -->

<!-- have to remove all msg and edit with are you sure? -->

<!-- after seleted batch it will show side on seletc batch button -->

<!-- count total number of class and actuall number of class will be show after add new class -->

<!-- I have to create all the data who will add new class  -->

<!-- Third priority is add day end report -->  not completed yet

<!-- I have to change the database server  -->

<!-- table name is UCMAS Classess  -->






<!-- In day end report -->

<!-- in date field should be by defoult today's date --> Complete

<!-- change the button value with Genrate report  -->  Complete
Complete
<!-- class record table

Batch ID UUID .//d dsf sf/sdf/s/f/a/f/a/f/a/////////sdf/s/
Batch Name
center
class date
class add by teacher name
current number of class

absent record

student id
date
batch name
center name
student name

1) in first table should be display all the batch which are shedule for the selected date Batch master table 
will not show center, id, Batch Day and Date
 -->

<!-- 2) in second table should be display actuall class batch for the selected date and that will come from class record table -->

<!-- 3) in third table should be display student data this will come from chack_val table  -->

<!-- 4) in forth table should be display from absent record table  -->

<!-- add the colum in day end report with batch name    -->


<!-- remove pagination -->


<!-- 
{
		method: 'GET',
		path: '/getting/all/absent-student/{date}/{stateName}/{AreaName}/{Center}',
		config:{
			validate:{
				params:{
					date: Joi.string(),
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
			var dayOfWeek = dateFormat(request.params.date, "dddd")
			var query = {$and:[{BatchDay:{$regex: dayOfWeek, $options: 'i'}}, {StateName:{$regex: request.params.stateName, $options: 'i'}},{AreaName:{$regex: request.params.AreaName, $options: 'i'}},{Center:{$regex: request.params.Center, $options: 'i'}}]}
			batchModal.find(query,function(err, batchDoc){
				if (err) {
					reply(err)
				}else{
					console.log(batchDoc)
					var _counter = 0;
					var totalStudentDoc;
					batchDoc.forEach(function(eachElement){
						studentModal.find({Batch: eachElement.Name, State: eachElement.StateName, Area: eachElement.AreaName, Center: eachElement.Center}, function(err, StudentDoc){
							if (err) {
								console.log(err)
							}else{
								console.log('=============================')
								totalStudentDoc = StudentDoc
								if (++_counter == batchDoc.length) {
									console.log(totalStudentDoc)
									var totalpersent = [];
									var _count = 0;
									totalStudentDoc.forEach(function(eachPersentStudent){
										absentModal.find({AbsentDate: request.params.date, uuid: eachPersentStudent.ID}, function(err, persentStudent){
											if (err) {
												console.log(err)
											}else{
												console.log(persentStudent)
												persentStudent.forEach(function(eachAbsent){
													totalpersent.push(eachAbsent)
												})
												if (++_count == totalStudentDoc.length) {
													reply(totalpersent)
												}
											}
										})
									})
								}
							}
						});		
					});
				}
			})

		}
	}, -->

make a filter to view center student data 

make a button for all student data 


deshboard is comming...
function fn_manage_call_register_assign() {
	value_changed_ind = false;
	calculated_plan_duration = "";
	calculated_plan_duration_uom = "";
			
	$("#manage_call_register_assign_call_number").text(manage_call_register_grid_1.dataSource.getByUid(manage_call_register_grid_1.select().data("uid")).call_no);
	$("#manage_call_register_assign_call_status").text(manage_call_register_grid_1.dataSource.getByUid(manage_call_register_grid_1.select().data("uid")).call_status_desc);
	
	/* DROP DOWN LIST INITIALIZATION - EMPLOYEE ID */
	manage_call_register_assign_employee_id = InitializeKendoComboBox({
		fieldID: "manage_call_register_assign_employee_id",
		dataSource: {
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values_for_codes",
			inputParameter: {
				p_lov_code_type : "CALL_ASSIGNTO_LIST",
				p_search_field_1 : "",
				p_search_field_2 : ""
			}
		},
		dataTextField: "p_code_value_description",
		dataValueField: "p_code_value",
		filterMode: false,
		events: {
			change: "fn_manage_call_register_assign_employee_id_event_change"
		}
	});
	
	/* DATE TIME PICKER INITIALIZATION - START DATE AND TIME */
	var currentDateTime = new Date();
	var currentYear = currentDateTime.getFullYear();
	var currentMonth = currentDateTime.getMonth();
	var currentDate = currentDateTime.getDate();
	var currentHour = currentDateTime.getHours();
	var currentMinute = currentDateTime.getMinutes();
	if (currentMinute > 0 && currentMinute < 30) {
		currentMinute = 30;
	}
	else if (currentMinute > 30) {
		currentMinute = 0;
		currentHour ++;
	}
	$("#manage_call_register_assign_start_date_and_time").kendoDateTimePicker({
		format: "dd-MM-yyyy HH:mm",
		value: new Date(currentYear, currentMonth, currentDate, currentHour, currentMinute),
		change: function(e) {
			if (manage_call_register_assign_start_date_and_time.value() != null) {
				var selectedDateTime = manage_call_register_assign_start_date_and_time.value();
				var selectedYear = selectedDateTime.getFullYear();
				var selectedMonth = selectedDateTime.getMonth();
				var selectedDate = selectedDateTime.getDate();
				var selectedHour = selectedDateTime.getHours();
				var selectedMinute = selectedDateTime.getMinutes();
				if (selectedMinute > 0 && selectedMinute < 30) {
					selectedMinute = 30;
				}
				else if (selectedMinute > 30) {
					selectedMinute = 0;
					selectedHour ++;
				}
				manage_call_register_assign_start_date_and_time.value(new Date(selectedYear, selectedMonth, selectedDate, selectedHour, selectedMinute));
				manage_call_register_assign_finish_date_and_time.min(new Date(selectedYear, selectedMonth, selectedDate, selectedHour, selectedMinute));
				manage_call_register_assign_finish_date_and_time.value(new Date(selectedYear, selectedMonth, selectedDate, selectedHour, selectedMinute));
				fn_calculate_plan_duration();
			}
		}
	});
	manage_call_register_assign_start_date_and_time = $("#manage_call_register_assign_start_date_and_time").data("kendoDateTimePicker");
	
	/* DATE TIME PICKER INITIALIZATION - FINISH DATE AND TIME */
	$("#manage_call_register_assign_finish_date_and_time").kendoDateTimePicker({
		format: "dd-MM-yyyy HH:mm",
		min: new Date(manage_call_register_assign_start_date_and_time.value()),
		value: new Date(manage_call_register_assign_start_date_and_time.value()),
		change: function(e) {
			if (manage_call_register_assign_start_date_and_time.value() != null) {
				var selectedDateTime = manage_call_register_assign_finish_date_and_time.value();
				var selectedYear = selectedDateTime.getFullYear();
				var selectedMonth = selectedDateTime.getMonth();
				var selectedDate = selectedDateTime.getDate();
				var selectedHour = selectedDateTime.getHours();
				var selectedMinute = selectedDateTime.getMinutes();
				if (selectedMinute > 0 && selectedMinute < 30) {
					selectedMinute = 30;
				}
				else if (selectedMinute > 30) {
					selectedMinute = 0;
					selectedHour ++;
				}
				manage_call_register_assign_finish_date_and_time.value(new Date(selectedYear, selectedMonth, selectedDate, selectedHour, selectedMinute));
				fn_calculate_plan_duration();
			}
		}
	});	
	manage_call_register_assign_finish_date_and_time = $("#manage_call_register_assign_finish_date_and_time").data("kendoDateTimePicker");
	
	$("#manage_call_register_assign_submit_btn").click(function() {
		fn_manage_call_register_assign_submit_btn_click();
	});
	
	$("#manage_call_register_assign_cancel_btn").click(function() {
		fn_manage_call_register_assign_cancel_btn_click();
	});
	
	$("#manage_call_register_assign_employee_id, #manage_call_register_assign_start_date_and_time, #manage_call_register_assign_finish_date_and_time").on("change", function() {
		value_changed_ind = true;
	});
	
	AttachValidationRules("manage_call_register_assign");
	ApplyConfiguredLabels("manage_call_register_assign");	
}

function fn_calculate_plan_duration() {
	var start_date_time_split = $("#manage_call_register_assign_start_date_and_time").val().split(" ");
	var start_date_split = start_date_time_split[0].split("-");
	var start_time_split = start_date_time_split[1].split(":");
	var startDate = parseInt(start_date_split[0]);
	var startMonth = parseInt(start_date_split[1]) - 1; 
	var startYear = parseInt(start_date_split[2]); 
	var startHour = parseInt(start_time_split[0]); 
	var startMinute = parseInt(start_time_split[1]); 
	var start_date_object = new Date(startYear, startMonth, startDate, startHour, startMinute);	
	
	var finish_date_time_split = $("#manage_call_register_assign_finish_date_and_time").val().split(" ");
	var finish_date_split = finish_date_time_split[0].split("-");
	var finish_time_split = finish_date_time_split[1].split(":");
	var finishDate = parseInt(finish_date_split[0]);
	var finishMonth = parseInt(finish_date_split[1]) - 1; 
	var finishYear = parseInt(finish_date_split[2]); 
	var finishHour = parseInt(finish_time_split[0]); 
	var finishMinute = parseInt(finish_time_split[1]); 
	var finish_date_object = new Date(finishYear, finishMonth, finishDate, finishHour, finishMinute);	
		
	if (start_date_object != "Invalid Date" && finish_date_object != "Invalid Date") {
		var hour_difference = finish_date_object - start_date_object;
		if (hour_difference >= 0) {
			$("#manage_call_register_assign_plan_duration").text(parseInt(hour_difference/(1000*60*60)) + "  Hours");
			$("#manage_call_register_assign_plan_work").text(parseInt(hour_difference/(1000*60*60)) + "  Hours");
			calculated_plan_duration = parseInt((hour_difference/(1000*60*60))).toString();
			calculated_plan_duration_uom = "h";
		}
	}
}

function fn_manage_call_register_assign_cancel_btn_click() {
	if (value_changed_ind == true) {
		if (confirm("You have modified one or more values on the form. Do you want to cancel the changes.")) {
			$("#openkendowindow").data("kendoWindow").close();
		}				 
	} 
	else {
		$("#openkendowindow").data("kendoWindow").close();
	}
}

function fn_manage_call_register_assign_submit_btn_click() {
	var validator = $("#manage_call_register_assign").data("kendoValidator");
	if (validator.validate()) {	
		var currentDate = new Date();
		var date = currentDate.getDate();
		var month = (currentDate.getMonth() + 1);
		var year = currentDate.getFullYear();
		if (date < 10) {
			date = "0" + date;
		}		
		if (month < 10) {
			month = "0" + month;
		}
		var hours = currentDate.getHours();
		var minutes = currentDate.getMinutes();
		if (hours < 10) {
			hours = "0" + hours;
		}
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		
		var startDateTime = $("#manage_call_register_assign_start_date_and_time").val();
		var startDateTimeSplit = startDateTime.split(" ");
		var startDateSplit = startDateTimeSplit[0].split("-");
		var startTimeSplit = startDateTimeSplit[1].split(":");
		
		var finishDateTime = $("#manage_call_register_assign_finish_date_and_time").val();
		var finishDateTimeSplit = finishDateTime.split(" ");
		var finishDateSplit = finishDateTimeSplit[0].split("-");
		var finishTimeSplit = finishDateTimeSplit[1].split(":");
		
		var save_manage_call_assignment_object = {
			p_call_no: manage_call_register_grid_1.dataSource.getByUid(manage_call_register_grid_1.select().data("uid")).call_no,
			p_assigned_to_emp_id: $("#manage_call_register_assign_employee_id").val(),
			p_assigned_on_date: year + "-" + month + "-" + date,
			p_assigned_on_hour: hours,
			p_assigned_on_minute: minutes,
			p_sch_start_date: startDateSplit[2] + "-" + startDateSplit[1] + "-" + startDateSplit[0],
			p_sch_start_hour: startTimeSplit[0],
			p_sch_start_minute: startTimeSplit[1],
			p_sch_finish_date: finishDateSplit[2] + "-" + finishDateSplit[1] + "-" + finishDateSplit[0],
			p_sch_finish_hour: finishTimeSplit[0],
			p_sch_finish_minute: finishTimeSplit[1],
			p_plan_duration: calculated_plan_duration,
			p_plan_duration_uom: calculated_plan_duration_uom,
			p_plan_work: calculated_plan_duration,
			p_plan_work_uom: calculated_plan_duration_uom
		};
		
		var returnValue = executeService_save_manage_call_assignment(save_manage_call_assignment_object)
		if (returnValue == "SP001") {
			alert("Call Assigned Successfully");
			fn_manage_call_register_refresh();
			$("#openkendowindow").data("kendoWindow").close();
		}
		else {
			alert("Call Assign Failed");
		}
	}
}

function fn_manage_call_register_assign_employee_id_event_change() {
	if (manage_call_register_assign_employee_id.dataItem() != undefined) {
		$("#manage_call_register_assign_employee_name").text(manage_call_register_assign_employee_id.dataItem().p_code_value_description);
	}
	else {
		$("#manage_call_register_assign_employee_name").text("");
	}
}
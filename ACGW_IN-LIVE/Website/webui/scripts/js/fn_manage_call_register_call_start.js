function fn_manage_call_register_call_start()
{
	value_changed_ind = false;
	
	$("#manage_call_register_call_start_start_date_and_time").kendoDateTimePicker(
	{
		format: "dd-MM-yyyy HH:mm",
		value: new Date()
	});
	manage_call_register_call_start_start_date_and_time = $("#manage_call_register_call_start_start_date_and_time").data("kendoDateTimePicker");
	if (selected_call_register_grid_record.call_category == "IC") {
		manage_call_register_call_start_start_date_and_time.enable(false);
	}
	
	$("#manage_call_register_call_start_submit_btn").click(function()
	{
		fn_manage_call_register_call_start_submit_btn_click();
	});
	
	$("#manage_call_register_call_start_cancel_btn").click(function()
	{
		fn_manage_call_register_call_start_cancel_btn_click();
	});
	
	$("#manage_call_register_call_start_start_date_and_time").on("change", function()
	{
		value_changed_ind = true;
	});
	
	AttachValidationRules("manage_call_register_call_start");
	ApplyConfiguredLabels("manage_call_register_call_start");	
}

function fn_manage_call_register_call_start_cancel_btn_click()
{
	if (value_changed_ind == true)
	{
		if (confirm("You have modified one or more values on the form. Do you want to cancel the changes."))
		{
			$("#openkendowindow").data("kendoWindow").close();
		}				 
	} 
	else
	{
		$("#openkendowindow").data("kendoWindow").close();
	}
}

function fn_manage_call_register_call_start_submit_btn_click()
{
	var validator = $("#manage_call_register_call_start").data("kendoValidator");
	if (validator.validate())
	{		
		var currentDate = new Date();
		var date = currentDate.getDate();
		var month = (currentDate.getMonth() + 1);
		var year = currentDate.getFullYear();
		if(date < 10)
		{
			date = "0" + date;
		}		
		if(month < 10)
		{
			month = "0" + month;
		}
		var hours = currentDate.getHours();
		var minutes = currentDate.getMinutes();
		if(hours < 10)
		{
			hours = "0" + hours;
		}
		if(minutes < 10)
		{
			minutes = "0" + minutes;
		}
		
		var startDateTime = $("#manage_call_register_call_start_start_date_and_time").val();
		var startDateTimeSplit = startDateTime.split(" ");
		var startDateSplit = startDateTimeSplit[0].split("-");
		var startTimeSplit = startDateTimeSplit[1].split(":");
		
		var update_call_start_object = 
		{
			p_call_ref_no: call_register_call_no,
			p_start_date: startDateSplit[2] + "-" + startDateSplit[1] + "-" + startDateSplit[0],
			p_start_hour: startTimeSplit[0],
			p_start_minute: startTimeSplit[1],
			p_event_date: year + "-" + month + "-" + date,
			p_event_hour: hours,
			p_event_minute: minutes,
			p_record_timestamp: "00000000-0000-0000-0000-000000000000",
		};
		
		var returnValue = executeService_update_call_start(update_call_start_object);
		if(returnValue == "SP001")
		{
			alert("Call Started Successfully");
			fn_manage_call_register_refresh();
			$("#openkendowindow").data("kendoWindow").close();
		}
		else
		{
			alert("Call Start Failed.");
		}		
	}
}
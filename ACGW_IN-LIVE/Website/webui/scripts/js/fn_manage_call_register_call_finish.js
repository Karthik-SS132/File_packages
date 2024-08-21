function fn_manage_call_register_call_finish()
{
	value_changed_ind = false;
	
	$("#manage_call_register_call_finish_finish_date_and_time").kendoDateTimePicker(
	{
		format: "dd-MM-yyyy HH:mm",
		value: new Date(),
		min: call_register_act_start_date_and_time
	});
	manage_call_register_call_finish_finish_date_and_time = $("#manage_call_register_call_finish_finish_date_and_time").data("kendoDateTimePicker");
	if (selected_call_register_grid_record.call_category == "IC") {
		manage_call_register_call_finish_finish_date_and_time.enable(false);
	}
	
	$("#manage_call_register_call_finish_submit_btn").click(function()
	{
		fn_manage_call_register_call_finish_submit_btn_click();
	});
	
	$("#manage_call_register_call_finish_cancel_btn").click(function()
	{
		fn_manage_call_register_call_finish_cancel_btn_click();
	});
	
	$("#manage_call_register_call_finish_finish_date_and_time").on("change", function()
	{
		value_changed_ind = true;
	});
	
	AttachValidationRules("manage_call_register_call_finish");
	ApplyConfiguredLabels("manage_call_register_call_finish");	
}

function fn_manage_call_register_call_finish_cancel_btn_click()
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

function fn_manage_call_register_call_finish_submit_btn_click()
{
	var validator = $("#manage_call_register_call_finish").data("kendoValidator");
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
		
		var finishDateTime = $("#manage_call_register_call_finish_finish_date_and_time").val();
		var finishDateTimeSplit = finishDateTime.split(" ");
		var finishDateSplit = finishDateTimeSplit[0].split("-");
		var finishTimeSplit = finishDateTimeSplit[1].split(":");
		
		var update_call_finish_object = 
		{
			p_call_ref_no: call_register_call_no,
			p_finish_date: finishDateSplit[2] + "-" + finishDateSplit[1] + "-" + finishDateSplit[0],
			p_finish_hour: finishTimeSplit[0],
			p_finish_minute: finishTimeSplit[1],
			p_event_date: year + "-" + month + "-" + date,
			p_event_hour: hours,
			p_event_minute: minutes,
			p_record_timestamp: call_register_rec_tstamp,
		};
		
		var returnValue = executeService_update_call_finish(update_call_finish_object);
		if(returnValue == "SP001")
		{
			alert("Call Finished Successfully");
			fn_manage_call_register_refresh();
			$("#openkendowindow").data("kendoWindow").close();
		}
		else
		{
			alert("Call Finish Failed.");
		}		
	}
}
function fn_manage_call_register_progress_update()
{
	value_changed_ind = false;
	
	$("#manage_call_register_progress_update_call_number").text(call_register_call_no);
	$("#manage_call_register_progress_update_call_status").text(call_register_call_status_desc);
	
	$("#manage_call_register_progress_update_submit_btn").click(function()
	{
		fn_manage_call_register_progress_update_submit_btn_click();
	});
	
	$("#manage_call_register_progress_update_cancel_btn").click(function()
	{
		fn_manage_call_register_progress_update_cancel_btn_click();
	});
	
	$("#manage_call_register_progress_update_comments").on("change", function()
	{
		value_changed_ind = true;
	});
	
	AttachValidationRules("manage_call_register_progress_update");
	ApplyConfiguredLabels("manage_call_register_progress_update");	
}

function fn_manage_call_register_progress_update_cancel_btn_click()
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

function fn_manage_call_register_progress_update_submit_btn_click()
{
	var validator = $("#manage_call_register_progress_update").data("kendoValidator");
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
		
		var save_manage_call_register_progress_update_object = 
		{
			p_call_no: call_register_call_no,
			p_comments: $("#manage_call_register_progress_update_comments").val().replace(/\n/g, "\\n"),
			p_progress_update_date: year + "-" + month + "-" + date,
			p_progress_update_hour: hours,
			p_progress_update_minute: minutes
		};
		
		var returnValue = executeService_save_manage_call_register_progress_update(save_manage_call_register_progress_update_object);
		if(returnValue == "SP001")
		{
			alert("Call Progress Updated Successfully.");
			fn_manage_call_register_refresh();
			$("#openkendowindow").data("kendoWindow").close();
		}
		else
		{
			alert("Call Progress Update Failed.");
		}		
	}
}
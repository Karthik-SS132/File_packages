function fn_manage_company_notifications_child()
{
	/* VARIABLE INITIALIZATION */
	manage_company_notifications_child_validator = $("#manage_company_notifications_child").kendoValidator().data("kendoValidator");	
	value_changed_ind="";
	
	/* Variable Initialization for Save Deatails*/
	Notification_Event_Code = "";
	
	/* SET UP FOR ADD SCREEN */
	if (save_mode_notification == "A")
	{
		Notification_Activate_Indicator = "0";
		rec_tstamp = "00000000-0000-0000-0000-000000000000";
	}
	
	/* SET UP FOR EDIT SCREEN */
	if (save_mode_notification == "U")
	{
		$("#manage_com_noti_event_code").val(selected_model['n_event_code']);
		$("#manage_com_noti_event_code").attr("disabled","disabled");
		$("#manage_com_noti_event_desc").val(selected_model['n_description']);
		if(selected_model['n_active_ind'] =='1')
		{
			Notification_Activate_Indicator = '0';
		}
		else if(selected_model['n_active_ind'] == '0')
		{
			Notification_Activate_Indicator = '1';
		}
		rec_tstamp = selected_model['rec_tstamp'];
	}
	
	/* Notification Id Text field change event */
	$("#manage_com_noti_event_code").on("change",function()
	{
		validation_field_1="";
		validation_field_2="";
		validation_field_3="";
		validation_field_4="";
		validation_field_5="";
		validation_field_6="";
		validation_field_7="";
		validation_field_8="";
		validation_field_9="";
		validation_field_10="";
		task_valid_ind="";
		if($("#manage_com_noti_event_code").val() != "")
		{
			screenname="NOTIFY_EVENT";
			validation_field_1 = $("#manage_com_noti_event_code").val();
			executeService_validate_key_field();
			if(task_valid_ind == "true")
			{
				alert("This notification id is already available.Please enter new notification id.");
				$("#manage_com_noti_event_code").val("");
			}
		}
	});
	
	/* TEST FOR DATA MODIFICATION */
	$("#manage_com_noti_event_code,#manage_com_noti_event_desc").on("change",function()
	{
		value_changed_ind=true;
	});
	
	/* CANCEL BUTTON CLICK */
	$("#manage_company_notifications_child_cancel").click(function()
	{
		if (value_changed_ind == true)
		{
			var isClose = confirm("You have modified one or more values on the form. Do you want to cancel the changes");
			if (isClose == true)
			{
				manage_company_notifications_child.data("kendoWindow").close();
			}				 
		} 
		else
		{
			manage_company_notifications_child.data("kendoWindow").close();				
		}
	});
	
	/* SUBMIT BUTTON CLICK */
	$("#manage_company_notifications_child_submit").click(function()
	{		
		if(manage_company_notifications_child_validator.validate())
		{
			Notification_Event_Code = $('#manage_com_noti_event_code').val();
			Notification_Event_Desc = $('#manage_com_noti_event_desc').val();
			return_value  = executeService_save_manage_company_notification();
			manage_company_notifications_child.data("kendoWindow").close();
			fn_refresh_manage_company_notifications_grid();
		}
		else
		{
			alert("Please fill all the fields that are mandatory.");
		}
	});
}
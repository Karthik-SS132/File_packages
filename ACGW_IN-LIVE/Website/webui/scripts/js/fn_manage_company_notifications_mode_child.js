function fn_manage_company_notifications_mode_child()
{
	/* VARIABLE INITIALIZATION */
	manage_company_notifications_mode_child_validator = $("#manage_company_notifications_mode_child").kendoValidator().data("kendoValidator");	
	value_changed_ind="";
	
	/* Variable Initialization for Save */
	Notification_Event_Code = selected_model['n_event_code'];
	Notificaion_Mode = "";
	Attachment_Indicator = "";
	Template_id = "";
	rec_tstamp = "";
	
	/* NOTIFICATION MODE DROPDOWN */
	function onChange_manage_com_noti_mode() 
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
		if(this.value() != "")
		{
			screenname="NOTIFY_MODE";
			validation_field_1 = Notification_Event_Code;
			validation_field_2 = this.value();
			executeService_validate_key_field();
			if(task_valid_ind == "true")
			{
				alert("This combinaton already available.Please select another new notification mode");
				this.value("");
			}
			else
			{
				Notificaion_Mode = this.value();
			}
		}
	}
		
	search_field_1 = "";
	search_field_2 = "";
	code_type = "NOTIFY_MODE";
	list_of_codes = [];	
	executeService_retrieve_listof_values_for_codes();
	
	$("#manage_com_noti_mode").kendoDropDownList(
	{
		optionLabel: "----------Select----------",
		dataTextField : "description",
		dataValueField : "code",
		dataSource : list_of_codes,
		change: onChange_manage_com_noti_mode
	});
	manage_com_noti_mode = $("#manage_com_noti_mode").data('kendoDropDownList');
	
	/* TEMPLATE DROPDOWN */
	search_field_1 = "";
	search_field_2 = "";
	code_type = "NOTIFY_TEMPLATE_LIST";
	list_of_codes = [];	
	executeService_retrieve_listof_values_for_codes();
	
	$("#manage_com_noti_mode_tmp").kendoDropDownList(
	{
		optionLabel: "----------Select----------",
		dataTextField : "description",
		dataValueField : "code",
		dataSource : list_of_codes,
		template:'${ data.code }'+'-'+'${ data.description }',
		change : function() {
			Template_id = this.value();
		}
	});
	var width = $("#manage_com_noti_mode_tmp").data("kendoDropDownList").list.width();
	if(width > 161)
	{
		$("#manage_com_noti_mode_tmp").data("kendoDropDownList").list.width(width + 10);
	}
	manage_com_noti_mode_tmp = $("#manage_com_noti_mode_tmp").data('kendoDropDownList');
		
	/* SET UP FOR ADD SCREEN */
	if (save_mode_notification_mode == "A")
	{
		rec_tstamp = "00000000-0000-0000-0000-000000000000";
	}
	
	/* SET UP FOR EDIT SCREEN */
	if (save_mode_notification_mode == "U")
	{
		Notification_Event_Code = selected_model_noti_mode['n_event_code'];
		Notificaion_Mode = selected_model_noti_mode['n_mode'];
		manage_com_noti_mode.value(selected_model_noti_mode['n_mode']);
		manage_com_noti_mode.enable(false);
		manage_com_noti_mode_tmp.value(selected_model_noti_mode['n_template_id']);
		if(selected_model_noti_mode['attach_avl_ind'] == "1")
		{
			$("#manage_com_noti_attach_ind_active").attr('checked',true);
		}
		rec_tstamp = selected_model_noti_mode['rec_tstamp'];
	}
	
	/* TEST FOR DATA MODIFICATION */
	$("#manage_com_noti_mode,#manage_com_noti_attach_ind_active,#manage_com_noti_attach_ind_deactive,#manage_com_noti_mode_tmp").on("change",function()
	{
		value_changed_ind=true;
	});
	
	/* CANCEL BUTTON CLICK */
	$("#manage_company_notifications_mode_child_cancel").click(function()
	{
		if (value_changed_ind == true)
		{
			var isClose = confirm("You have modified one or more values on the form. Do you want to cancel the changes");
			if (isClose == true)
			{
				manage_company_notifications_mode_child.data("kendoWindow").close();
			}				 
		} 
		else
		{
			manage_company_notifications_mode_child.data("kendoWindow").close();				
		}
	});
	
	/* SUBMIT BUTTON CLICK */
	$("#manage_company_notifications_mode_child_submit").click(function()
	{		
		if(manage_company_notifications_mode_child_validator.validate())
		{
			if($("#manage_com_noti_attach_ind_active").is(":checked"))
			{
				Attachment_Indicator = "1";
			}
			else
			{
				Attachment_Indicator = "0";
			}
			return_value  = executeService_save_manage_company_notification_mode();
			manage_company_notifications_mode_child.data("kendoWindow").close();
			fn_refresh_manage_company_notifications_mode_grid();
		}
		else
		{
			alert("Please fill all the fields that are mandatory.");
		}
	});
}
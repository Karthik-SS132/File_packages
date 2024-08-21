function fn_manage_company_notifications_mode_recipients_child()
{
	/* VARIABLE INITIALIZATION */
	manage_company_notifications_mode_recipients_child_validator = $("#manage_company_notifications_mode_recipients_child").kendoValidator().data("kendoValidator");	
	value_changed_ind="";
	
	/* Variable Initialization for Save Deatails*/
	Notification_Event_Code = selected_model['n_event_code'];
	Notificaion_Mode = selected_model_noti_mode['n_mode'];
	Recipient_Type = "";
	ID_Type = "";
	Org_Level_No = "0";
	ID_Code = "";
	
	//console.log("save_mode_notification_mode_recipient[0]:"+save_mode_notification_mode_recipient);
	if(save_mode_notification_mode_recipient == "A")
	{
		//console.log("save_mode_notification_mode_recipient[1]:"+save_mode_notification_mode_recipient);
		rec_tstamp = "00000000-0000-0000-0000-000000000000";
		
		/* DROP DOWN LIST FOR RECIPIENT TYPE */
		var reci_type_data = [{description: "To", code:"To"},{description: "Cc", code:"Cc"}];
		for(var c=0;c<manage_company_notifications_mode_recipients_datasource_data.length;c++)
		{
			if(manage_company_notifications_mode_recipients_datasource_data[c].n_recipient_type == "To")
			{
				reci_type_data = [{description: "Cc", code:"Cc"}];
			}
		}
		function onChange_manage_com_noti_reci_type()
		{
			Recipient_Type = this.value();
		}
		console.log("save_mode_notification_mode_recipient[2]:"+save_mode_notification_mode_recipient);
		$("#manage_com_noti_reci_type").kendoDropDownList(
		{
			optionLabel: "----------Select----------",
			dataTextField : "description",
			dataValueField : "code",
			dataSource : reci_type_data,
			change: onChange_manage_com_noti_reci_type
		});
		manage_com_noti_reci_type = $("#manage_com_noti_reci_type").data('kendoDropDownList');
		
		/*DROP DOWN LIST FOR ID TYPE */
		search_field_1 = "";
		search_field_2 = "";
		code_type = "NOTIFY_RECIDTYPE";
		list_of_codes = [];
		
		list_of_notify_reci_id_type = [];
		list_of_org_level = [];
		list_of_id_code = [];
		executeService_retrieve_listof_values_for_codes();
		list_of_notify_reci_id_type = list_of_codes;
		
		function onChange_manage_com_noti_id_type()
		{
			ID_Type = this.value();
			if(this.value() == "RQ" || this.value() == "AT" || this.value() == "CU" || this.value() == "FS" || this.value() == "LH" || this.value() == "TE")
			{
				manage_com_noti_org_level.value("");
				manage_com_noti_id_code.value("");
				manage_com_noti_org_level.enable(false);
				manage_com_noti_id_code.enable(false);
				Org_Level_No = "0";
				ID_Code = "";
				$('#manage_com_noti_org_level_class').hide();
				$('#manage_com_noti_id_code_class').hide();
			}
			else if(this.value() == "SU" || this.value() == "TS")
			{
				manage_com_noti_org_level.value("");
				manage_com_noti_id_code.value("");
				manage_com_noti_org_level.enable(false);
				manage_com_noti_id_code.enable(true);
				Org_Level_No = "0";
				search_field_1 = "";
				search_field_2 = "";
				code_type = "SUPVSR";
				list_of_codes = [];
				executeService_retrieve_listof_values_for_codes();
				manage_com_noti_id_code.dataSource.data(list_of_codes);
				manage_com_noti_id_code.value("");
				$('#manage_com_noti_org_level_class').hide();
			}
			else if(this.value() == "OR")
			{
				/*manage_com_noti_org_level.value("");
				manage_com_noti_id_code.value("");
				manage_com_noti_org_level.enable(true);
				manage_com_noti_id_code.enable(false);
				search_field_1 = "";
				search_field_2 = "";
				code_type = this.value();
				org_levels_data = [];
				executeService_retrieve_listof_org_levels();
				manage_com_noti_org_level.dataSource.data(org_levels_data);
				manage_com_noti_org_level.value("");
				$('#manage_com_noti_org_level_class').show();
				$('#manage_com_noti_id_code_class').hide();*/
				
				manage_com_noti_org_level.value("");
				manage_com_noti_id_code.value("");
				manage_com_noti_org_level.enable(false);
				manage_com_noti_id_code.enable(true);
				Org_Level_No = "0";
				var org_levels_code = [{"text":"Assigned To Org.Head","value":"AO"},{"text":"Next Level Org.Head","value":"O1"},{"text":"Org.Head - 3rd Level","value":"O2"}];
				manage_com_noti_id_code.dataSource.data(org_levels_code);
				manage_com_noti_id_code.value("");
				//$('#manage_com_noti_org_level_class').hide();
			}
			else if(this.value() == "EI")
			{
				var employee_data_list = [];
				var employee_data_str = "[";
				for(var i=0;i<employee_data.data().length;i++)
				{
					if (i!=0) {
						employee_data_str += ',{"text":' +'"'+ employee_data.data()[i].emp_name + '"' + ',' + '"value":' +'"'+ employee_data.data()[i].id + '"}';
					}
					else {
						employee_data_str +=  '{"text":' +'"'+ employee_data.data()[i].emp_name + '"' + ',' + '"value":' +'"'+ employee_data.data()[i].id + '"}';
					}
				}
				employee_data_str += "]";
				manage_com_noti_org_level.value("");
				manage_com_noti_id_code.value("");
				manage_com_noti_org_level.enable(false);
				manage_com_noti_id_code.enable(true);
				Org_Level_No = "0";
				manage_com_noti_id_code.setDataSource(eval(employee_data_str));
				manage_com_noti_id_code.value("");
				$('#manage_com_noti_org_level_class').hide();
				$('#manage_com_noti_id_code_class').show();
			}
			else if(this.value() == "FR" || this.value() == "CF")
			{
				manage_com_noti_org_level.value("");
				manage_com_noti_id_code.value("");
				manage_com_noti_org_level.enable(false);
				manage_com_noti_id_code.enable(true);
				Org_Level_No = "0";
				search_field_1 = "";
				search_field_2 = "";
				code_type = "FR";
				list_of_codes = [];
				executeService_retrieve_listof_values_for_codes();
				manage_com_noti_id_code.setDataSource(list_of_codes);
				manage_com_noti_id_code.value("");
				$('#manage_com_noti_org_level_class').hide();
				$('#manage_com_noti_id_code_class').show();
			}
			else
			{
				
			}
		}
		console.log("save_mode_notification_mode_recipient[3]:"+save_mode_notification_mode_recipient);
		$("#manage_com_noti_id_type").kendoDropDownList(
		{
			optionLabel: "----------Select----------",
			dataTextField : "description",
			dataValueField : "code",
			dataSource : list_of_notify_reci_id_type,
			change: onChange_manage_com_noti_id_type,
			open: function(e) { 
				/* SETTING THE LIST WIDTH TO MATCH THE CONTENT */
				$(".k-list-container").css("width", "auto");
				$(".k-list-container").css("white-space", "nowrap");
				$(".k-list-container").css("min-width", $("#manage_com_noti_id_type").width());
				$(".k-list-container").css("max-width", 610);
				$(".k-list-container").css("overflow-x", "hidden");
				$(".k-list-container").css("overflow-y", "auto");
				$(".k-list").css("width", "auto");
				$(".k-list").css("overflow-x", "hidden");
			}
		});
		manage_com_noti_id_type = $("#manage_com_noti_id_type").data('kendoDropDownList');
		
		/*DROP DOWN LIST FOR ORGANOGRAM LEVEL */
		function onChange_manage_com_noti_org_level()
		{
			Org_Level_No = this.value();
			/*org_entity_type = this.value();
			org_lvl_code_arr = [];
			org_lvlcodes_data = [];
			list_of_org_entities = [];
			executeService_retrieve_listof_org_level_codes();
			manage_com_noti_id_code.enable(true);
			manage_com_noti_id_code.setDataSource(org_lvlcodes_data);
			manage_com_noti_id_code.value("");
			$('#manage_com_noti_id_code_class').show();*/
		}
		console.log("save_mode_notification_mode_recipient[4]:"+save_mode_notification_mode_recipient);
		$("#manage_com_noti_org_level").kendoDropDownList(
		{
			optionLabel: "----------Select----------",
			dataTextField : "level_name",
			dataValueField : "level_id",
			dataSource : list_of_org_level,
			change: onChange_manage_com_noti_org_level,
			open: function(e) { 
				/* SETTING THE LIST WIDTH TO MATCH THE CONTENT */
				$(".k-list-container").css("width", "auto");
				$(".k-list-container").css("white-space", "nowrap");
				$(".k-list-container").css("min-width", $("#manage_com_noti_org_level").width());
				$(".k-list-container").css("max-width", 600);
				$(".k-list-container").css("overflow-x", "hidden");
				$(".k-list-container").css("overflow-y", "auto");
				$(".k-list").css("width", "auto");
				$(".k-list").css("overflow-x", "hidden");
			}
		});
		manage_com_noti_org_level = $("#manage_com_noti_org_level").data('kendoDropDownList');
		
		
		console.log("save_mode_notification_mode_recipient[5]:"+save_mode_notification_mode_recipient);
		$("#manage_com_noti_id_code").kendoDropDownList(
		{
			optionLabel: "----------Select----------",
			dataTextField : "text",
			dataValueField : "value",
			dataSource : list_of_id_code,
			change: manage_com_noti_id_code_event_change,
			open: function(e) { 
				/* SETTING THE LIST WIDTH TO MATCH THE CONTENT */
				$(".k-list-container").css("width", "auto");
				$(".k-list-container").css("white-space", "nowrap");
				$(".k-list-container").css("min-width", $("#manage_com_noti_id_code").width());
				$(".k-list-container").css("max-width", 600);
				$(".k-list-container").css("overflow-x", "hidden");
				$(".k-list-container").css("overflow-y", "auto");
				$(".k-list").css("width", "auto");
				$(".k-list").css("overflow-x", "hidden");
			}
		});
		manage_com_noti_id_code = $("#manage_com_noti_id_code").data('kendoDropDownList');
		
		manage_com_noti_org_level.enable(false);
		manage_com_noti_id_code.enable(false);
	}
	else
	{
	
	}
	
	/* TEST FOR DATA MODIFICATION */
	$("#manage_com_noti_reci_type,#manage_com_noti_id_type,#manage_com_noti_org_level,#manage_com_noti_id_code").on("change",function()
	{
		value_changed_ind=true;
	});
	
	/* CANCEL BUTTON CLICK */
	$("#manage_company_notifications_mode_recipients_child_cancel").click(function()
	{
		if (value_changed_ind == true)
		{
			var isClose = confirm("You have modified one or more values on the form. Do you want to cancel the changes");
			if (isClose == true)
			{
				manage_company_notifications_mode_recipients_child.data("kendoWindow").close();
			}
		} 
		else
		{
			manage_company_notifications_mode_recipients_child.data("kendoWindow").close();				
		}
	});
	
	/* SUBMIT BUTTON CLICK */
	$("#manage_company_notifications_mode_recipients_child_submit").click(function()
	{		
		if(manage_company_notifications_mode_recipients_child_validator.validate())
		{
			task_valid_ind="";
			screenname="NOTIFY_RECIPIENT";
			validation_field_1 = Notification_Event_Code;
			validation_field_2 = Notificaion_Mode;
			validation_field_3 = Recipient_Type;
			validation_field_4 = ID_Type;
			validation_field_5 = Org_Level_No;
			validation_field_6 = ID_Code;
			validation_field_7="";
			validation_field_8="";
			validation_field_9="";
			validation_field_10="";
			executeService_validate_key_field();
			if(task_valid_ind == "true")
			{
				alert("This combinaton already available.Please select another new Combination.");
				manage_com_noti_reci_type.value("");
				manage_com_noti_id_type.value("");
				manage_com_noti_org_level.value("");
				manage_com_noti_id_code.value("");
					
			}
			else
			{
				return_value  = executeService_save_manage_company_notification_recipients();
				manage_company_notifications_mode_recipients_child.data("kendoWindow").close();
				fn_refresh_manage_company_notifications_mode_recipients_grid();
			}
		}
		else
		{
			alert("Please fill all the fields that are mandatory.");
		}
	});
}
/*DROP DOWN LIST FOR ID CODE */
function manage_com_noti_id_code_event_change()
{
	ID_Code = manage_com_noti_id_code.value();
}
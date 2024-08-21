function fn_manage_data_access_profile_edit()
{
	//Access For Event
	code_type = 'DPRF_ACCCD';
	list_of_codes = [];
	list_of_org_entities = [];
	executeService_retrieve_listof_values_for_codes();
	
	$("#manage_data_access_profile_edit_access_for_event").kendoDropDownList({
		optionLabel:"---Select---",
		dataTextField: "description",
		dataValueField: "code",
		dataSource:list_of_codes ,
		template:'${data.code}'+'-'+'${data.description}',
		change:function()
		{
			access_for_Event = this.value();
			
			search_field_1 = access_for_Event;
			list_of_codes = [{code:'ALL',description:'ALL'}];
			
			fn_manage_data_access_profile_edit_change_event();
			
			manage_data_access_profile_edit_category_dd.setDataSource(list_of_codes);
			manage_data_access_profile_edit_category_dd.enable(true);
			
		}
	});
	var manage_data_access_profile_edit_access_for_event_dd = $("#manage_data_access_profile_edit_access_for_event").data('kendoDropDownList');
	
	//level 1
	org_entity_type = '1';
	org_lvl_code_arr = [];
	org_lvlcodes_data = [{level_code:'ALL',level_code_desc:'ALL'}];
	executeService_retrieve_listof_org_level_codes();
	
	$("#manage_data_access_profile_edit_level1").kendoDropDownList({
		optionLabel:"---Select---",
		dataTextField: "level_code_desc",
		dataValueField: "level_code",
		dataSource:org_lvlcodes_data ,
		template:'${data.level_code}'+'-'+'${data.level_code_desc}'
	});
	var manage_data_access_profile_edit_level1_dd =  $("#manage_data_access_profile_edit_level1").data('kendoDropDownList');
	//if(org_lvlcodes_data == '')
	if(login_profile.no_of_org_level < '1')
	{
		$("#lbl_manage_data_access_profile_edit_level1").find('span').remove();
		manage_data_access_profile_edit_level1_dd.enable(false);
		$('.lvl1').hide();
	}
	else
	{
		$("#lbl_manage_data_access_profile_edit_level1").append('<span class="required">*</span>');
	}
	
	//level 2
	org_entity_type = '2';
	org_lvlcodes_data = [{level_code:'ALL',level_code_desc:'ALL'}];
	executeService_retrieve_listof_org_level_codes();
	
	$("#manage_data_access_profile_edit_level2").kendoDropDownList({
		optionLabel:"---Select---",
		dataTextField: "level_code_desc",
		dataValueField: "level_code",
		dataSource:org_lvlcodes_data ,
		template:'${data.level_code}'+'-'+'${data.level_code_desc}'
	});
	var manage_data_access_profile_edit_level2_dd =  $("#manage_data_access_profile_edit_level2").data('kendoDropDownList');
	//if(org_lvlcodes_data == '')
	if(login_profile.no_of_org_level < '2')
	{
		$("#lbl_manage_data_access_profile_edit_level2").find('span').remove();
		manage_data_access_profile_edit_level2_dd.enable(false);
		$('.lvl2').hide();
	}
	else
	{
		$("#lbl_manage_data_access_profile_edit_level2").append('<span class="required">*</span>');
	}
	
	//level 3
	org_entity_type = '3';
	org_lvlcodes_data = [{level_code:'ALL',level_code_desc:'ALL'}];
	executeService_retrieve_listof_org_level_codes();
	
	$("#manage_data_access_profile_edit_level3").kendoDropDownList({
		optionLabel:"---Select---",
		dataTextField: "level_code_desc",
		dataValueField: "level_code",
		dataSource:org_lvlcodes_data ,
		template:'${data.level_code}'+'-'+'${data.level_code_desc}'
	});
	var manage_data_access_profile_edit_level3_dd =  $("#manage_data_access_profile_edit_level3").data('kendoDropDownList');
	//if(org_lvlcodes_data == '')
	if(login_profile.no_of_org_level < '3')
	{
		$("#lbl_manage_data_access_profile_edit_level3").find('span').remove();
		manage_data_access_profile_edit_level3_dd.enable(false);
		$('.lvl3').hide();
	}
	else
	{
		$("#lbl_manage_data_access_profile_edit_level3").append('<span class="required">*</span>');
	}
	
	//level 4
	org_entity_type = '4';
	org_lvlcodes_data = [{level_code:'ALL',level_code_desc:'ALL'}];
	executeService_retrieve_listof_org_level_codes();
	
	$("#manage_data_access_profile_edit_level4").kendoDropDownList({
		optionLabel:"---Select---",
		dataTextField: "level_code_desc",
		dataValueField: "level_code",
		dataSource:org_lvlcodes_data ,
		template:'${data.level_code}'+'-'+'${data.level_code_desc}'
	});
	var manage_data_access_profile_edit_level4_dd =  $("#manage_data_access_profile_edit_level4").data('kendoDropDownList');
	if(login_profile.no_of_org_level < '4')
	{
		$("#lbl_manage_data_access_profile_edit_level4").find('span').remove();
		manage_data_access_profile_edit_level4_dd.enable(false);
		$('.lvl4').hide();
	}
	else
	{
		$("#lbl_manage_data_access_profile_edit_level4").append('<span class="required">*</span>');
	}
	
	//level 5
	org_entity_type = '5';
	org_lvlcodes_data = [{level_code:'ALL',level_code_desc:'ALL'}];
	executeService_retrieve_listof_org_level_codes();
	
	$("#manage_data_access_profile_edit_level5").kendoDropDownList({
		optionLabel:"---Select---",
		dataTextField: "level_code_desc",
		dataValueField: "level_code",
		dataSource:org_lvlcodes_data ,
		template:'${data.level_code}'+'-'+'${data.level_code_desc}'
	});
	var manage_data_access_profile_edit_level5_dd =  $("#manage_data_access_profile_edit_level5").data('kendoDropDownList');
	if(login_profile.no_of_org_level < '5')
	{
		$("#lbl_manage_data_access_profile_edit_level5").find('span').remove();
		manage_data_access_profile_edit_level5_dd.enable(false);
		$('.lvl5').hide();
	}
	else
	{
		$("#lbl_manage_data_access_profile_edit_level5").append('<span class="required">*</span>');
	}
	
	//company location
	company_country_locations_data = [{location_code:'ALL',location_name:'ALL'}];
	executeService_retrieve_listof_company_country_locations();
	
	$("#manage_data_access_profile_edit_location").kendoDropDownList({
		optionLabel:"---Select---",
		dataTextField: "location_name",
		dataValueField: "location_code",
		dataSource:company_country_locations_data ,
		template:'${data.location_code}'+'-'+'${data.location_name}'
	});
	var manage_data_access_profile_edit_location_dd =  $("#manage_data_access_profile_edit_location").data('kendoDropDownList');
	
	//Request Category
	$("#manage_data_access_profile_edit_category").kendoDropDownList({
		optionLabel:"---Select---",
		dataTextField: "description",
		dataValueField: "code",
		template:'${data.code}'+'-'+'${data.description}',
		enable:false,
		close:function()
		{
			var req_cat_val = this.value();
			code_type = 'DPRQTYPE';
			search_field_1 = access_for_Event;
			search_field_2 = req_cat_val;
			list_of_codes = [{code:'ALL',description:'ALL'}];
			
			fn_manage_data_access_profile_edit_close_event(req_cat_val);
		}
	});
	
	var manage_data_access_profile_edit_category_dd =  $("#manage_data_access_profile_edit_category").data('kendoDropDownList');
	
	//Request Type
	/*jo_type_data = [];
	executeService_retrieve_listof_jo_type();
	code_type = 'DPRQTYPE';
	search_field_1 = "APPROVE-JO";
	search_field_2 = '';
	list_of_codes = [];
	executeService_retrieve_listof_values_for_codes();
	jo_type_data_dS=new kendo.data.DataSource({data:list_of_codes});*/
	
	$("#manage_data_access_profile_edit_type").kendoDropDownList({
		optionLabel:"---Select---",
		enable:false,
		dataTextField: "description",
		dataValueField: "code",
		//dataSource:jo_type_data_dS ,
		template:'${data.code}'+'-'+'${data.description}'
	});
	var manage_data_access_profile_edit_type_dd = $("#manage_data_access_profile_edit_type").data('kendoDropDownList');

	//ID Type
	id_type_data=[{value:"SU",text:"Supervisor"},{value:"OR",text:"Organization Head"},{value:"EI",text:"Employee ID"},{value:"FR",text:"Functional Role"}];
	
	$("#manage_data_access_profile_edit_id_type").kendoDropDownList({
		optionLabel:"---Select---",
		dataTextField: "text",
		dataValueField: "value",
		dataSource:id_type_data,
		close:function()
		{
			code_type = this.value();
			if(code_type == 'OR')
			{
				manage_data_access_profile_edit_org_dd.enable(true);
				manage_data_access_profile_edit_id_value_dd.value('');
				manage_data_access_profile_edit_id_value_dd.enable(false);
				org_levels_data = [];
				executeService_retrieve_listof_org_levels();
				manage_data_access_profile_edit_org_dd.setDataSource(org_levels_data);
				if($("#lbl_manage_data_access_profile_edit_org").find('span').length == 0)
				{
					$("#lbl_manage_data_access_profile_edit_org").append('<span class="required">*</span>');
				}
			}
			else if(code_type == 'FR')
			{
				manage_data_access_profile_edit_org_dd.enable(false);
				manage_data_access_profile_edit_org_dd.value('');
				manage_data_access_profile_edit_id_value_dd.enable(true);
				list_of_codes = [];
				executeService_retrieve_listof_values_for_codes();
				manage_data_access_profile_edit_id_value_dd.setDataSource(list_of_codes);
				$("#lbl_manage_data_access_profile_edit_org").find('span').remove();
			}
			else if(code_type == 'SU')
			{
				manage_data_access_profile_edit_org_dd.enable(false);
				manage_data_access_profile_edit_org_dd.value('');
				manage_data_access_profile_edit_id_value_dd.enable(true);
				id_code_supervisor_data = [{value:"SUPVSR1",text:"SUPERVISOR 1"},{value:"SUPVSR2",text:"SUPERVISOR 2"},{value:"SUPVSR3",text:"SUPERVISOR 3"}];
				manage_data_access_profile_edit_id_value_dd.setDataSource(id_code_supervisor_data);
				$("#lbl_manage_data_access_profile_edit_org").find('span').remove();
			}
			else if(code_type == 'EI')
			{
				manage_data_access_profile_edit_org_dd.enable(false);
				manage_data_access_profile_edit_org_dd.value('');
				manage_data_access_profile_edit_id_value_dd.enable(true);
				employee_data = [];
				executeService_retrieve_listof_employees();
				manage_data_access_profile_edit_id_value_dd.setDataSource(employee_data);
				$("#lbl_manage_data_access_profile_edit_org").find('span').remove();
			}
		}
	});
	var manage_data_access_profile_edit_id_type_dd = $("#manage_data_access_profile_edit_id_type").data('kendoDropDownList');
	
	//Org. Level No.
	$("#manage_data_access_profile_edit_org").kendoDropDownList({
		optionLabel:"---Select---",
		enable:false,
		dataTextField: "level_name",
		dataValueField: "level_id",
		template:'${data.level_id}'+'-'+'${data.level_name}',
		close:function()
		{
			org_entity_type = this.value();
			org_lvlcodes_data = [];
			executeService_retrieve_listof_org_level_codes();
			manage_data_access_profile_edit_id_value_dd.setDataSource(org_lvlcodes_data);
			manage_data_access_profile_edit_id_value_dd.enable(true);
		}
	});
	var manage_data_access_profile_edit_org_dd = $("#manage_data_access_profile_edit_org").data('kendoDropDownList');
	
	//ID Value
	$("#manage_data_access_profile_edit_id_value").kendoDropDownList({
		optionLabel:"---Select---",
		enable:false,
		dataTextField: "text",
		dataValueField: "value",
		template:'${data.value}'+'-'+'${data.text}'
	});
	var manage_data_access_profile_edit_id_value_dd = $("#manage_data_access_profile_edit_id_value").data('kendoDropDownList');
	
	/*for(var i=1; i<=login_profile.no_of_org_level; i++)
	{
		eval("$('.lvl"+i+"').show()");
	}*/
	//In edit mode 
	if(save_mode == 'U')
	{
		fn_manage_data_access_profile_edit_editing_event(manage_data_access_profile_edit_type_dd,manage_data_access_profile_edit_category_dd);
		
		//Populating ID Value and Org. Level Dropdownlist
		if(selected_daprof_rowmodel.id_type == 'OR')
		{
			manage_data_access_profile_edit_org_dd.enable(true);
			manage_data_access_profile_edit_id_value_dd.value('');
			manage_data_access_profile_edit_id_value_dd.enable(false);
			org_levels_data = [];
			executeService_retrieve_listof_org_levels();
			manage_data_access_profile_edit_org_dd.setDataSource(org_levels_data);
			if($("#lbl_manage_data_access_profile_edit_org").find('span').length == 0)
			{
				$("#lbl_manage_data_access_profile_edit_org").append('<span class="required">*</span>');
			}
		}
		else if(selected_daprof_rowmodel.id_type == 'FR')
		{
			code_type = selected_daprof_rowmodel.id_type;
			manage_data_access_profile_edit_org_dd.enable(false);
			manage_data_access_profile_edit_org_dd.value('');
			manage_data_access_profile_edit_id_value_dd.enable(true);
			list_of_codes = [];
			executeService_retrieve_listof_values_for_codes();
			manage_data_access_profile_edit_id_value_dd.setDataSource(list_of_codes);
			$("#lbl_manage_data_access_profile_edit_org").find('span').remove();
		}
		else if(selected_daprof_rowmodel.id_type == 'SU')
		{
			manage_data_access_profile_edit_org_dd.enable(false);
			manage_data_access_profile_edit_org_dd.value('');
			manage_data_access_profile_edit_id_value_dd.enable(true);
			id_code_supervisor_data = [{value:"SUPVSR1",text:"SUPERVISOR 1"},{value:"SUPVSR2",text:"SUPERVISOR 2"},{value:"SUPVSR3",text:"SUPERVISOR 3"}];
			manage_data_access_profile_edit_id_value_dd.setDataSource(id_code_supervisor_data);
			$("#lbl_manage_data_access_profile_edit_org").find('span').remove();
		}
		else if(selected_daprof_rowmodel.id_type == 'EI')
		{
			manage_data_access_profile_edit_org_dd.enable(false);
			manage_data_access_profile_edit_org_dd.value('');
			manage_data_access_profile_edit_id_value_dd.enable(true);
			employee_data = [];
			executeService_retrieve_listof_employees();
			manage_data_access_profile_edit_id_value_dd.setDataSource(employee_data);
			$("#lbl_manage_data_access_profile_edit_org").find('span').remove();
		}
		
		//Populating Org.Level No
		if(selected_daprof_rowmodel.id_type == 'OR')
		{
			org_entity_type = selected_daprof_rowmodel.id_org_level_no;
			org_lvlcodes_data = [];
			executeService_retrieve_listof_org_level_codes();
			manage_data_access_profile_edit_id_value_dd.setDataSource(org_lvlcodes_data);
			manage_data_access_profile_edit_id_value_dd.enable(true);
		}
		
		//Setting the values in the input field.
		manage_data_access_profile_edit_access_for_event_dd.value(selected_daprof_rowmodel.access_for_event);
		manage_data_access_profile_edit_level1_dd.value(selected_daprof_rowmodel.level1_code);
		manage_data_access_profile_edit_level2_dd.value(selected_daprof_rowmodel.level2_code);
		manage_data_access_profile_edit_level3_dd.value(selected_daprof_rowmodel.level3_code);
		manage_data_access_profile_edit_level4_dd.value(selected_daprof_rowmodel.level4_code);
		manage_data_access_profile_edit_level5_dd.value(selected_daprof_rowmodel.level5_code);
		manage_data_access_profile_edit_location_dd.value(selected_daprof_rowmodel.location_code);
		manage_data_access_profile_edit_category_dd.value(selected_daprof_rowmodel.request_category);
		manage_data_access_profile_edit_type_dd.value(selected_daprof_rowmodel.request_type);
		manage_data_access_profile_edit_id_type_dd.value(selected_daprof_rowmodel.id_type);
		manage_data_access_profile_edit_org_dd.value(selected_daprof_rowmodel.id_org_level_no);
		manage_data_access_profile_edit_id_value_dd.value(selected_daprof_rowmodel.id_code);
		
		//disabling primary key input fields.
		manage_data_access_profile_edit_access_for_event_dd.enable(false);
		manage_data_access_profile_edit_level1_dd.enable(false);
		manage_data_access_profile_edit_level2_dd.enable(false);
		manage_data_access_profile_edit_level3_dd.enable(false);
		manage_data_access_profile_edit_level4_dd.enable(false);
		manage_data_access_profile_edit_level5_dd.enable(false);
		manage_data_access_profile_edit_category_dd.enable(false);
		manage_data_access_profile_edit_type_dd.enable(false);
		manage_data_access_profile_edit_location_dd.enable(false);
	}
	
	//Validator
	var manage_data_access_profile_edit_validator = $('#manage_data_access_profile_edit').kendoValidator().data("kendoValidator");
	
	//Submit
	$('#manage_data_access_profile_edit_submit').on('click',function()
	{
		if (manage_data_access_profile_edit_validator.validate()) 
		{
			if (value_changed_ind == true)
			{
				p_access_for_event = manage_data_access_profile_edit_access_for_event_dd.value();
				if(manage_data_access_profile_edit_level1_dd.value() != '')
				{
					p_level1_code = manage_data_access_profile_edit_level1_dd.value();
				}
				else
				{
					p_level1_code = 'NA';
				}
				if(manage_data_access_profile_edit_level2_dd.value() != '')
				{
					p_level2_code = manage_data_access_profile_edit_level2_dd.value();
				}
				else
				{
					p_level2_code = 'NA';
				}
				if(manage_data_access_profile_edit_level3_dd.value() != '')
				{
					p_level3_code = manage_data_access_profile_edit_level3_dd.value();
				}
				else
				{
					p_level3_code = 'NA';
				}
				if(manage_data_access_profile_edit_level4_dd.value() != '')
				{
					p_level4_code = manage_data_access_profile_edit_level4_dd.value();
				}
				else
				{
					p_level4_code = 'NA';
				}
				if(manage_data_access_profile_edit_level5_dd.value() != '')
				{
					p_level5_code = manage_data_access_profile_edit_level5_dd.value();
				}
				else
				{
					p_level5_code = 'NA';
				}
				p_location_code = manage_data_access_profile_edit_location_dd.value();
				p_request_category = manage_data_access_profile_edit_category_dd.value();
				p_request_type = manage_data_access_profile_edit_type_dd.value();
				p_id_type = manage_data_access_profile_edit_id_type_dd.value();
				if(manage_data_access_profile_edit_org_dd.value() != '')
				{
					p_org_level_no = manage_data_access_profile_edit_org_dd.value();
				}
				else
				{
					p_org_level_no = '0';
				}
				p_id_code = manage_data_access_profile_edit_id_value_dd.value();
				if(save_mode == 'A')
				{
					p_rec_timestamp = '00000000-0000-0000-0000-000000000000';
				}
				else if(save_mode == 'U')
				{
					p_rec_timestamp = selected_daprof_rowmodel.rec_tstamp;
				}
				if(save_mode == 'A')
				{
					screenname = 'DATA_ACCPROF';
					validation_field_1 = p_access_for_event;
					validation_field_2 = p_level1_code;
					validation_field_3 = p_level2_code;
					validation_field_4 = p_level3_code;
					validation_field_5 = p_level4_code;
					validation_field_6 = p_level5_code;
					validation_field_7 = p_location_code;
					validation_field_8 = p_request_category;
					validation_field_9 = p_request_type;
					validation_field_10 = '';
					executeService_validate_key_field();
					if(task_valid_ind == 'true')
					{
						alert('Combination already available. Please Choose a new combination.');
						manage_data_access_profile_edit_access_for_event_dd.value('');
						manage_data_access_profile_edit_level1_dd.value('');
						manage_data_access_profile_edit_level2_dd.value('');
						manage_data_access_profile_edit_level3_dd.value('');
						manage_data_access_profile_edit_level4_dd.value('');
						manage_data_access_profile_edit_level5_dd.value('');
						manage_data_access_profile_edit_location_dd.value('');
						manage_data_access_profile_edit_category_dd.value('');
						manage_data_access_profile_edit_type_dd.value('');
					}
					else
					{
						executeService_save_manage_data_access_profile();
						manage_data_access_profile_child.data("kendoWindow").close();
						if(update_status == 'SP001')
						{
							manage_data_access_profile_event_type_dd.value(mn_acc_for_event_filt);
							manage_data_access_profile_event_type_dd.trigger('close');
						}
					}
				}
				else
				{
					executeService_save_manage_data_access_profile();
					manage_data_access_profile_child.data("kendoWindow").close();
					if(update_status == 'SP001')
					{
						manage_data_access_profile_event_type_dd.value(mn_acc_for_event_filt);
						manage_data_access_profile_event_type_dd.trigger('close');
					}
				}
			}
			else if(value_changed_ind == false)
			{
				isScreenEditable = false;
				alert('No changes done');
				manage_data_access_profile_child.data("kendoWindow").close();
			}
		}
		else
		{
			alert('Please Fill All The Details.');
		}
	});
	
	//Cancel
	$('#manage_data_access_profile_edit_cancel').on('click',function()
	{
		isScreenEditable = false;
	    if (value_changed_ind == true)
		{
			var isClose = confirm("You have modified one or more values on the form. Do you want to cancel the changes");
			if (isClose == true)
				manage_data_access_profile_child.data("kendoWindow").close();
		}  
		else
			manage_data_access_profile_child.data("kendoWindow").close();
	});
	
	$('#manage_data_access_profile_edit_access_for_event, #manage_data_access_profile_edit_level1, #manage_data_access_profile_edit_level2, #manage_data_access_profile_edit_level3, #manage_data_access_profile_edit_level4, #manage_data_access_profile_edit_level5, #manage_data_access_profile_edit_location, #manage_data_access_profile_edit_category, #manage_data_access_profile_edit_type,#manage_data_access_profile_edit_id_type, #manage_data_access_profile_edit_org, #manage_data_access_profile_edit_id_value').on('change', function()
	{
	    value_changed_ind = true;	
	});
}
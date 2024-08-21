function fn_manage_call_resource_update_child()
{
	uom_ds = new kendo.data.DataSource();
	$("#manage_call_resource_update_child_act_qty").kendoNumericTextBox({min:1});
	r_list = [];
	r_list.push({
		r_list_id:'UE',
		r_list_name:'USER ENTRY',
		r_list_source:'UE'
	});

	$("#manage_call_resource_update_child_resource_id").kendoDropDownList({
		optionLabel: "---Select---",
		dataTextField: "r_list_name",
		dataValueField: "r_list_id",
		dataSource:r_list,
		template:"${data.r_list_id}"+"-"+"${data.r_list_name}",
		
	});
	manage_call_resource_update_child_resource_id = $("#manage_call_resource_update_child_resource_id").data("kendoDropDownList");
	manage_call_resource_update_child_act_qty = $("#manage_call_resource_update_child_act_qty").data("kendoNumericTextBox");
	if(edit_type == "C")
	{
		uom_display_ind = true;
		manage_call_resource_update_child_category_default_value = "";
		manage_call_resource_update_child_type_default_value = "";
		manage_call_resource_update_child_uom_default_value = "";
		manage_call_resource_update_child_act_qty.value("");
	}
	else if(edit_type == "U")
	{
		if(manage_call_resource_update_grid_1.dataSource.getByUid(manage_call_resource_update_grid_1.select().data("uid")).resource_list_id == "USERENTRY")
		{
			manage_call_resource_update_child_resource_id.value('UE');
		}
		else
		{
			manage_call_resource_update_child_resource_id.value(manage_call_resource_update_grid_1.dataSource.getByUid(manage_call_resource_update_grid_1.select().data("uid")).resource_list_id);
		}
		manage_call_resource_update_child_category_default_value = manage_call_resource_update_grid_1.dataSource.getByUid(manage_call_resource_update_grid_1.select().data("uid")).resource_category;
		manage_call_resource_update_child_type_default_value = manage_call_resource_update_grid_1.dataSource.getByUid(manage_call_resource_update_grid_1.select().data("uid")).resource_code;
		manage_call_resource_update_child_uom_default_value =manage_call_resource_update_grid_1.dataSource.getByUid(manage_call_resource_update_grid_1.select().data("uid")).uom;
		manage_call_resource_update_child_act_qty.value(manage_call_resource_update_grid_1.dataSource.getByUid(manage_call_resource_update_grid_1.select().data("uid")).actual_quantity);	
		uom_display_ind = false;
	}
	manage_call_resource_update_child_category = InitializeKendoDropDownList(
	{
		fieldID: "manage_call_resource_update_child_category",
		dataSource: 
		{
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values_for_codes",
			inputParameter:
			{
				p_lov_code_type: "RESOURCECATG",
				p_search_field_1: "",
				p_search_field_2: "",
				
			}
		},
		defaultValue: manage_call_resource_update_child_category_default_value,
	/*	events: 
		{
			change: "fn_manage_call_resource_update_child_category_event_change"
		},*/
		dataTextField: "p_code_value_description",
		dataValueField: "p_code_value",
		filterMode: false
	});
	manage_call_resource_update_child_type = InitializeKendoDropDownList(
	{
		fieldID: "manage_call_resource_update_child_type",
		dataSource: 
		{
			applicationName: "common_modules",
			serviceName: "retrieve_listof_resource_catg_code",
		},
		cascading:
		{
			cascadeFrom: "manage_call_resource_update_child_category",
			cascadeFromField: "p_resource_catg_code",
			defaultCascadeValue:manage_call_resource_update_child_category_default_value,
		},
		
		defaultValue: manage_call_resource_update_child_type_default_value,
		events: 
		{
			change: "fn_manage_call_resource_update_child_type_event_change"
		},
		dataTextField: "p_resource_code_desc",
		dataValueField: "p_resource_code",
		filterMode: false
	});
	
	
	manage_call_resource_update_child_uom = InitializeKendoDropDownList(
	{
		fieldID: "manage_call_resource_update_child_uom",
		dataSource: [],
		/*{
			applicationName: "common_modules",
			serviceName: "retrieve_listof_uom_code",
			inputParameter:
			{
				p_uom_type: "RC"
			}
		},*/
		defaultValue:manage_call_resource_update_child_uom_default_value,
		events: 
		{
			//change: "fn_manage_call_resource_update_child_uom_event_change",
			open: "fn_manage_call_resource_update_child_uom_event_open"
		},
		dataTextField: "p_description_field_1",
		dataValueField: "p_value_field_1",
		filterMode: false
	});
	
	$("#manage_call_resource_update_child_submit").on("click",function()
	{
		if(manage_call_resource_update_child_validator.validate()  )
		{
			resource_update_data = [{resource_source_ind:"",resource_category:"",resource_code:"",actual_qty:"",uom:"",detail_rec_timestamp:"",rec_crud_ind:""}];
			p_project_id = call_no;
			project_task_level_ind = "C";
			p_task_id = "0";
			if($("#manage_call_resource_update_child_resource_id").val() == "UE")
			{
				job_profile.template_id = "NA";
				res_list_source ="UE";
				resource_update_data[0]['resource_source_ind']= 'UE';
			}
			else
			{
				job_profile.template_id = "NA";
				res_list_source ="TE";
				resource_update_data[0]['resource_source_ind']= 'TE';
			}
			r_list_id = $("#manage_call_resource_update_child_resource_id").val();
			if(edit_type == "C")
			{
				resource_header_rec_tstamp = '00000000-0000-0000-0000-000000000000';
				resource_update_data[0]['detail_rec_timestamp']='00000000-0000-0000-0000-000000000000';
			}
			else
			{
				resource_header_rec_tstamp = manage_call_resource_update_grid_1.dataSource.getByUid(manage_call_resource_update_grid_1.select().data("uid")).detail_rec_tstamp;;
				resource_update_data[0]['detail_rec_timestamp']= manage_call_resource_update_grid_1.dataSource.getByUid(manage_call_resource_update_grid_1.select().data("uid")).detail_rec_tstamp;
			}
		
			resource_update_data[0]['resource_category']= manage_call_resource_update_child_category.value();
			resource_update_data[0]['resource_code']= manage_call_resource_update_child_type.value();
			resource_update_data[0]['actual_qty']= $("#manage_call_resource_update_child_act_qty").val();
			resource_update_data[0]['uom']= $("#manage_call_resource_update_child_uom").val();
			resource_update_data[0]['rec_crud_ind']= edit_type;
			var update_status = executeService_update_project_resourcelist_detail();
		
			if(update_status == "SP001")
			{
				alert("Resource list saved successfully");
				manage_call_resource_update_datasource_1.read();
			}
			
			manage_call_resource_update_window.close();
		}
		else
		{
			alert("Fill all the mandatory fields");
		}
	});
	$('#manage_call_resource_update_child_cancel').on('click',function()
	  {
		isScreenEditable = false;
	    if (value_changed_ind == true)
		{
			var isClose = confirm("You have modified one or more values on the form. Do you want to cancel the changes");
			if (isClose == true)
				manage_call_resource_update_window.close();
				 
		} 
        else
		{
				manage_call_resource_update_window.close();
				
		}
		
	  });
	  
	  $('#manage_call_resource_update_child_category,#manage_call_resource_update_child_type,#manage_call_resource_update_child_act_qty,#manage_call_resource_update_child_uom').on('change', function()
	  {
	    value_changed_ind = true;	
	  });
	if(edit_type == "U")
	{
		
		manage_call_resource_update_child_category.enable(false);
		manage_call_resource_update_child_type.enable(false);
		manage_call_resource_update_child_resource_id.enable(false);
	}
	AttachValidationRules("manage_call_resource_update_child");
	manage_call_resource_update_child_validator = $("#manage_call_resource_update_child").data("kendoValidator");
}
function fn_manage_call_resource_update_child_category_event_change()
{
	
	if(manage_call_resource_update_child_category.value() != "")
	{
		$("#lbl_manage_call_resource_update_child_category").text(manage_call_resource_update_child_category.value());
	}
	else
	{
		$("#lbl_manage_call_resource_update_child_category").text("");
	}
}
function fn_manage_call_resource_update_child_type_event_change()
{
	/*if(manage_call_resource_update_child_type.value() != "")
	{
		$("#lbl_manage_call_resource_update_child_type").text(manage_call_resource_update_child_type.value());
	}
	else
	{
		$("#lbl_manage_call_resource_update_child_type").text("");
	} */
	if(edit_type == "C")
	{
		ret_value = $.grep(manage_call_resource_update_datasource_1.data(),function(element,i){
		
			return manage_call_resource_update_child_category.value() == element.resource_category && manage_call_resource_update_child_type.value() == element.resource_code
		});
	}
	if(edit_type == "U")
	{
		ret_value = $.grep(manage_call_resource_update_datasource_1.data(),function(element,i){
		
			return manage_call_resource_update_child_category.value() == element.resource_category && manage_call_resource_update_child_type.value() == element.resource_code && manage_call_resource_update_grid_1.select().data("uid") != element.uid
		});
	}
	if(ret_value.length != 0)
	{
		alert("The selected combination is already available.Choose new one");
	}
	
	uom_data = executeService_retrieve_listof_values({p_lov_code:"RESCDUOM",p_search_field_1: manage_call_resource_update_child_category.value(),
	p_search_field_2:manage_call_resource_update_child_type.value(),
	p_search_field_3:"",p_search_field_4:"",p_search_field_5:""});
	uom_ds.data(uom_data);
	manage_call_resource_update_child_uom.setDataSource(uom_ds);
	manage_call_resource_update_child_uom.value("");
	
}
function fn_manage_call_resource_update_child_uom_event_change()
{
	if(manage_call_resource_update_child_uom.value() != "")
	{
		$("#lbl_manage_call_resource_update_child_uom").text(manage_call_resource_update_child_uom.value());
	}
	else
	{
		$("#lbl_manage_call_resource_update_child_uom").text("");
	}
}
function fn_manage_call_resource_update_child_uom_event_open()
{
	if(uom_display_ind == false)
	{
		uom_data = executeService_retrieve_listof_values({p_lov_code:"RESCDUOM",p_search_field_1: manage_call_resource_update_child_category.value(),
		p_search_field_2:manage_call_resource_update_child_type.value(),
		p_search_field_3:"",p_search_field_4:"",p_search_field_5:""});
		uom_ds.data(uom_data);
		manage_call_resource_update_child_uom.setDataSource(uom_ds);
		uom_display_ind = true;
	}
}
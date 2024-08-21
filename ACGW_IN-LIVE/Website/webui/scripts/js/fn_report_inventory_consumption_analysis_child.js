function fn_report_inventory_consumption_analysis_child()
{

	inventory_id_array_child=new Array();
	inventory_id_array_child[0]='inv_organogram_level_no_child';
	inventory_id_array_child[1]='inv_organogram_level_code_child';
	inventory_id_array_child[2]='inv_category_child';
	inventory_id_array_child[3]='inv_status_child';
	inventory_id_array_child[4]='inv_priority_child';
	inventory_id_array_child[5]='inv_close_year_child';
	inventory_id_array_child[6]='inv_close_qtr_child';
	inventory_id_array_child[7]='inv_close_month_child';
	inventory_id_array_child[8]='inv_close_wk_of_mth_child';
	inventory_id_array_child[9]='inv_close_day_of_wk_child';
	inventory_id_array_child[10]='inv_eq_id_child';
	inventory_id_array_child[11]='inv_asset_child';
	inventory_id_array_child[12]='inv_customer_id_child';
	inventory_id_array_child[13]='inv_item_types_child';
	inventory_id_array_child[14]='inv_wh_id_child';
	inventory_id_array_child[15]='inv_item_code_child';
	inventory_id_array_child[16]='inv_item_vcode_child';
	inventory_id_array_child[17]='inv_task_code_child';
	inventory_id_array_child[18]='inv_fn_role_child';
	inventory_id_array_child[19]='inv_emp_child';
	inventory_id_array_child[20]='inv_rep_fn_role_child';
	inventory_id_array_child[21]='inv_rep_emp_child';
	inventory_id_array_child[22]='inv_map_fn_role_child';
	inventory_id_array_child[23]='inv_map_emp_child';
	
	var inputParameter ="";
	inv_organogram_level_no_child = InitializeDropDownListWithTransport("inv_organogram_level_no_child", "common_modules","retrieve_listof_org_levels", "p_level_name", "p_level_id",inputParameter,false,true,"setValue1");
	
	inv_organogram_level_no_child.bind("change",function()
	{
		text=this.text();
		inventory_array_child[0]=this.value();
		org_entity_type =this.value();
		if(org_entity_type != "ALL")
		{
		org_lvl_code_arr=new Array();
		org_entities_code = [{"text":"ALL",value:"ALL"}];
		executeService_retrieve_listof_org_level_codes();
   			
		for(i=0;i<org_lvl_code_arr.length;i++)
		{
			org_entities_code.push({
				value:org_lvl_code_arr[i][0],
	            text:org_lvl_code_arr[i][1]
			});
		}
	
		inv_organogram_level_code_child.dataSource.data(org_entities_code);
		inv_organogram_level_code.dataSource.data(org_entities_code);
		}  
		else
		{
			org_entities_code = [{"text":"ALL",value:"ALL"}];
			inv_organogram_level_code_child.dataSource.data(org_entities_code);	
		}
		if(this.value() != "ALL")
		{
			inv_organogram_level_no.text(text);
			inv_organogram_level_no.enable(false); 
		}
		else
		{
			inv_organogram_level_no.text(text);
			inv_organogram_level_no.enable(true); 
		}
	});

	
	$("#inv_organogram_level_code_child").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:quarter_data,
	change:function()
	{
		text=this.text();
		inventory_array_child[1]=this.value();
		if(this.value() != "ALL")
		{
			inv_organogram_level_code.text(text);
			inv_organogram_level_code.enable(false); 
		}
		else
		{
			inv_organogram_level_code.text(text);
			inv_organogram_level_code.enable(true); 
		}
	}
	
	});
	inv_organogram_level_code_child=$("#inv_organogram_level_code_child").data("kendoDropDownList");
	
	var inputParameter ="";
	inv_category_child = InitializeDropDownListWithTransport("inv_category_child", "mservice","retrieve_listof_jo_category", "p_description", "p_jo_category",inputParameter,false,true,"setValue");
	
	inv_category_child.bind("change",function()
	{
		text=this.text();
		inventory_array_child[2]=this.value();
		if(this.value() != "ALL")
		{
			inv_category.text(text);
			inv_category.enable(false); 
		}
		else
		{
			inv_category.text(text);
			inv_category.enable(true); 
		}
	});
	
	var inputParameter ="";
	inv_status_child = InitializeDropDownListWithTransport("inv_status_child", "mservice","retrieve_listof_jo_status", "p_description", "p_jo_status",inputParameter,false,true,"setValue");
	
	inv_status_child.bind("change",function()
	{
		text=this.text();
		inventory_array_child[3]=this.value();
		if(this.value() != "ALL")
		{
			inv_status.text(text);
			inv_status.enable(false); 
		}
		else
		{
			inv_status.text(text);
			inv_status.enable(true); 
		}
	});
	var inputParameter = {p_lov_code_type : "JOPRIORITY", p_search_field_1 : "", p_search_field_2 : ""};
	inv_priority_child = InitializeDropDownListWithTransport("inv_priority_child", "common_modules","retrieve_listof_values_for_codes", "p_code_value_description","p_code_value",inputParameter,false,true,"setValue");
	
	inv_priority_child.bind("change",function()
	{
		text=this.text();
		inventory_array_child[4]=this.value();
		if(this.value() != "ALL")
		{
			inv_priority.text(text);
			inv_priority.enable(false); 
		}
		else
		{
			inv_priority.text(text);
			inv_priority.enable(true); 
		}
	});
	
	
	$("#inv_close_year_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:year_data,
	change:function()
	{
		text=this.text();
		inventory_array_child[5]=this.value();
		if(this.value() != "ALL")
		{
			inv_close_year.text(text);
			inv_close_year.enable(false); 
		}
		else
		{
			inv_close_year.text(text);
			inv_close_year.enable(true); 
		}
	}
	});
	inv_close_year_child=$("#inv_close_year_child").data("kendoDropDownList");
	$("#inv_close_qtr_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:quarter_data,
	change:function()
	{
		text=this.text();
		inventory_array_child[6]=this.value();
		if(this.value() != "ALL")
		{
			inv_close_qtr.text(text);
			inv_close_qtr.enable(false); 
		}
		else
		{
			inv_close_qtr.text(text);
			inv_close_qtr.enable(true); 
		}
	}
	
	});
	inv_close_qtr_child=$("#inv_close_qtr_child").data("kendoDropDownList");
	
	$("#inv_close_month_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:month_data,
	change:function()
	{
		text=this.text();
		inventory_array_child[7]=this.value();
		if(this.value() != "ALL")
		{
			inv_close_month.text(text);
			inv_close_month.enable(false); 
		}
		else
		{
			inv_close_month.text(text);
			inv_close_month.enable(true); 
		}
	}
	
	});
	inv_close_month_child=$("#inv_close_month_child").data("kendoDropDownList");
	
	$("#inv_close_wk_of_mth_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:week_of_month_data,
	change:function()
	{
		text=this.text();
		inventory_array_child[8]=this.value();
		if(this.value() != "ALL")
		{
			inv_close_wk_of_mth.text(text);
			inv_close_wk_of_mth.enable(false); 
		}
		else
		{
			inv_close_wk_of_mth.text(text);
			inv_close_wk_of_mth.enable(true); 
		}
	}
	
	});
	inv_close_wk_of_mth_child=$("#inv_close_wk_of_mth_child").data("kendoDropDownList");
	
	$("#inv_close_day_of_wk_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:day_of_week_data,
	change:function()
	{
		text=this.text();
		inventory_array_child[9]=this.value();
		if(this.value() != "ALL")
		{
			inv_close_day_of_wk.text(text);
			inv_close_day_of_wk.enable(false); 
		}
		else
		{
			inv_close_day_of_wk.text(text);
			inv_close_day_of_wk.enable(true); 
		}
	}
	});
	inv_close_day_of_wk_child=$("#inv_close_day_of_wk_child").data("kendoDropDownList");

	
	var inputParameter ="";
	inv_asset_child = InitializeComboBoxWithTransport("inv_asset_child", "mservice","retrieve_listof_asset", "p_asset_description ", "p_asset_id",inputParameter,false,true,"setValue");
	
	inv_asset_child.bind("change",function()
	{
		text=this.text();
		inventory_array_child[11]=this.value();
		if(this.value() != "ALL")
		{
			inv_asset.text(text);
			inv_asset.enable(false); 
		}
		else
		{
			inv_asset.text(text);
			inv_asset.enable(true); 
		}
	});
	
	var inputParameter ="";
	inv_eq_id_child = InitializeDropDownListWithTransport("inv_eq_id_child", "mservice","retrieve_listof_equipment", "p_description", "p_equipment_id",inputParameter,false,true,"setValue");
	
	inv_eq_id_child.bind("change",function()
	{
		text=this.text();
		inventory_array_child[10]=this.value();
		if(this.value() != "ALL")
		{
			inv_eq_id.text(text);
			inv_eq_id.enable(false); 
		}
		else
		{
			inv_eq_id.text(text);
			 inv_eq_id.enable(true); 
		}
	});
	var inputParameter ="";
	inv_customer_id_child = InitializeDropDownListWithTransport("inv_customer_id_child", "common_modules","retrieve_listof_customers", "p_customer_name", "p_customer_id",inputParameter,false,true,"setValue");
	
	inv_customer_id_child.bind("change",function()
	{
		text=this.text();
		inventory_array_child[12]=this.value();
		if(this.value() != "ALL")
		{
			inv_customer_id.text(text);
			inv_customer_id.enable(false); 
		}
		else
		{
			inv_customer_id.text(text);
			inv_customer_id.enable(true); 
		}
	});
	
		var inputParameter ="";
	inv_item_types_child = InitializeDropDownListWithTransport("inv_item_types_child", "mservice","retrieve_listof_item_types", "p_description", "p_item_type",inputParameter,false,true,"setValue");
	
	inv_item_types_child.bind("change",function()
	{
		text=this.text();
		inventory_array_child[13]=this.value();
		if(this.value() != "ALL")
		{
			inv_item_types.text(text);
			inv_item_types.enable(false); 
		}
		else
		{
			inv_item_types.text(text);
			inv_item_types.enable(true); 
		}
	});
	
	
	var inputParameter ="";
	inv_wh_id_child = InitializeDropDownListWithTransport("inv_wh_id_child", "mservice","retrieve_listof_wh_code", "p_description", "p_wh_code",inputParameter,false,true,"setValue");
	
	inv_wh_id_child.bind("change",function()
	{
		text=this.text();
		inventory_array_child[14]=this.value();
		if(this.value() != "ALL")
		{
			inv_wh_id.text(text);
			inv_wh_id.enable(false); 
		}
		else
		{
			inv_wh_id.text(text);
			inv_wh_id.enable(true); 
		}
	});
;
	
	var inputParameter ="";
	inv_item_code_child = InitializeDropDownListWithTransport("inv_item_code_child", "mservice","retrieve_listof_item_master", "p_item_description", "p_item_code",inputParameter,false,true,"setValue");
	
	inv_item_code_child.bind("change",function()
	{
		text=this.text();
		inventory_array_child[15]=this.value();
		if(this.value() != "ALL")
		{
			inv_item_code.text(text);
			inv_item_code.enable(false); 
		}
		else
		{
			inv_item_code.text(text);
			inv_item_code.enable(true); 
		}
	});

	
	var inputParameter ="";
	inv_item_vcode_child = InitializeDropDownListWithTransport("inv_item_vcode_child", "mservice","retrieve_listof_item_master", "p_variant_description", "p_item_variant_code",inputParameter,false,true,"setValue");
	
	inv_item_vcode_child.bind("change",function()
	{
		text=this.text();
		inventory_array_child[16]=this.value();
		if(this.value() != "ALL")
		{
			inv_item_vcode.text(text);
			inv_item_vcode.enable(false); 
		}
		else
		{
			inv_item_vcode.text(text);
			inv_item_vcode.enable(true); 
		}
	});
	
	
		var inputParameter ="";
	inv_task_code_child = InitializeDropDownListWithTransport("inv_task_code_child", "common_modules","retrieve_listof_task_code", "p_description", "p_task_code",inputParameter,false,true,"setValue");
	
	inv_task_code_child.bind("change",function()
	{
		text=this.text();
		inventory_array_child[17]=this.value();
		if(this.value() != "ALL")
		{
			inv_task_code.text(text);
			inv_task_code.enable(false); 
		}
		else
		{
			inv_task_code.text(text);
			inv_task_code.enable(true); 
		}
	});
	
	
	var inputParameter = {p_lov_code_type : "FR", p_search_field_1 : "", p_search_field_2 : ""};
	inv_fn_role_child = InitializeDropDownListWithTransport("inv_fn_role_child", "common_modules","retrieve_listof_values_for_codes", "p_code_value_description", "p_code_value",inputParameter,false,true,"setValue2");
	
	inv_fn_role_child.bind("change",function()
	{
		text=this.text();
		inventory_array_child[18]=this.value();
		if(this.value() != "ALL")
		{
			inv_fn_role.text(text);
			inv_fn_role.enable(false); 
			fn_role_filter = this.value();
			employee_data= [{code:"ALL",description:"ALL"}];
			executeService_retrieve_listof_functional_role_employee_list();
			inv_emp_child.dataSource.data(employee_data);
		}
		else
		{
			inv_fn_role.text(text);
			inv_fn_role.enable(true); 
			inv_emp_child.value("ALL");
			employee_data= [{code:"ALL",description:"ALL"}];
			inv_emp_child.dataSource.data(employee_data);
		}
	});
	employee_data= [{code:"ALL",description:"ALL"}];
	$("#inv_emp_child").kendoComboBox({
	dataTextField: "code",
    dataValueField: "code",
    dataSource:employee_data,
	template:'${ data.code }'+'-'+'${ data.description }',
	change:function()
	{
		text=this.text();
		inventory_array_child[19]=this.value();
		if(this.value() != "ALL")
		{
			inv_emp.text(text);
			inv_emp.enable(false); 
		}
		else
		{
			inv_emp.text(text);
			inv_emp.enable(true); 
		}
	}
	});
	inv_emp_child = $("#inv_emp_child").data("kendoComboBox");

	var inputParameter = {p_lov_code_type : "FR", p_search_field_1 : "", p_search_field_2 : ""};
	inv_rep_fn_role_child = InitializeDropDownListWithTransport("inv_rep_fn_role_child", "common_modules","retrieve_listof_values_for_codes", "p_code_value_description", "p_code_value",inputParameter,false,true,"setValue3");
	
	inv_rep_fn_role_child.bind("change",function()
	{
		text=this.text();
		inventory_array_child[20]=this.value();
		if(this.value() != "ALL")
		{
			inv_rep_fn_role.text(text);
			inv_rep_fn_role.enable(false);
			fn_role_filter = this.value();
			employee_data= [{code:"ALL",description:"ALL"}];
			executeService_retrieve_listof_functional_role_employee_list();
			inv_rep_emp_child.dataSource.data(employee_data);
		}
		else
		{
			inv_rep_emp_child.value("ALL");
			inv_rep_fn_role.text(text);
			inv_rep_fn_role.enable(true); 
			employee_data= [{code:"ALL",description:"ALL"}];
			inv_rep_emp_child.dataSource.data(employee_data);
		}
	});
	
	$("#inv_rep_emp_child").kendoComboBox({
	dataTextField: "code",
    dataValueField: "code",
    dataSource:employee_data,
	template:'${ data.code }'+'-'+'${ data.description }',
	change:function()
	{
		text=this.text();
		inventory_array_child[21]=this.value();
		if(this.value() != "ALL")
		{
			inv_rep_emp.text(text);
			inv_rep_emp.enable(false); 
		}
		else
		{
			inv_rep_emp.text(text);
			inv_rep_emp.enable(true); 
		}
	}
	});
	inv_rep_emp_child = $("#inv_rep_emp_child").data("kendoComboBox");
	
	
	
	var inputParameter = {p_lov_code_type : "FR", p_search_field_1 : "", p_search_field_2 : ""};
	inv_map_fn_role_child = InitializeDropDownListWithTransport("inv_map_fn_role_child", "common_modules","retrieve_listof_values_for_codes", "p_code_value_description", "p_code_value",inputParameter,false,true,"setValue4");
	
	inv_map_fn_role_child.bind("change",function()
	{
		text=this.text();
		inventory_array_child[22]=this.value();
		if(this.value() != "ALL")
		{
			inv_map_fn_role.text(text);
			inv_map_fn_role.enable(false);
			fn_role_filter = this.value();
			employee_data= [{code:"ALL",description:"ALL"}];
			executeService_retrieve_listof_functional_role_employee_list();
			inv_map_emp_child.dataSource.data(employee_data);
		}
		else
		{
			inv_map_emp_child.value("ALL");
			inv_map_fn_role.text(text);
			inv_map_fn_role.enable(true);
			employee_data= [{code:"ALL",description:"ALL"}];
			inv_map_emp_child.dataSource.data(employee_data);			
		}
	});
	
	$("#inv_map_emp_child").kendoComboBox({
	dataTextField: "code",
    dataValueField: "code",
    dataSource:employee_data,
	template:'${ data.code }'+'-'+'${ data.description }',
	change:function()
	{
		text=this.text();
		inventory_array_child[23]=this.value();
		if(this.value() != "ALL")
		{
			inv_map_emp.text(text);
			inv_map_emp.enable(false); 
		}
		else
		{
			inv_map_emp.text(text);
			inv_map_emp.enable(true); 
		}
	}
	});
	inv_map_emp_child = $("#inv_map_emp_child").data("kendoComboBox");
	inv_emp_child.value("ALL");
	inv_rep_emp_child.value("ALL");
	inv_map_emp_child.value("ALL");
	
	$('#report_inventory_consumption_analysis_child_set').on("click",function()
	{

		for(i=0;i<inventory_array_child.length;i++)
		{
		inventory_array[i]=inventory_array_child[i];
		}
		child_window.close();
	});


	$('#report_inventory_consumption_analysis_child_reset').on("click",function()
	{
		for(i=0;i<inventory_id_array_child.length;i++)
		{

			eval(inventory_id_array_child[i]+'.value("ALL")');
			eval(inventory_id_array[i]+'.text("ALL")');
			eval(inventory_id_array[i]+'.enable(true)');
		}

		for(i=0;i<inventory_array_child.length;i++)
		{
		inventory_array_child[i] = "ALL";
		}
	});

	$('#report_inventory_consumption_analysis_child_cancel').on("click",function()
	{
		child_window.close();
	});

}
function setValue()
{
	for(i=0;i<inventory_array.length;i++)
	{
		if(inventory_array[i] != 'ALL')
		{	
		eval(inventory_id_array_child[i]+'.value('+'"'+inventory_array[i]+'"'+')');

		}
		//inventory_array[i]=="ALL";
	}
}
function setValue1()
{
	setValue();
	if(inv_organogram_level_no_child.value() != "ALL")
	{
		org_entity_type =inv_organogram_level_no_child.value();
		org_lvl_code_arr=new Array();
		org_entities_code = [{"text":"ALL",value:"ALL"}];
		executeService_retrieve_listof_org_level_codes();
			
		for(i=0;i<org_lvl_code_arr.length;i++)
		{
			org_entities_code.push({
				value:org_lvl_code_arr[i][0],
				text:org_lvl_code_arr[i][1]
			});
		}
	
		inv_organogram_level_code_child.dataSource.data(org_entities_code);
	}
	
}
function setValue2()
{
	setValue();
	if(inv_fn_role_child.value() != "ALL")
	{
		fn_role_filter = inv_fn_role_child.value();
		employee_data= [{code:"ALL",description:"ALL"}];
		executeService_retrieve_listof_functional_role_employee_list();
		inv_emp_child.dataSource.data(employee_data);
	}
	
}
function setValue3()
{
	setValue();
	if(inv_rep_fn_role_child.value() != "ALL")
	{
		fn_role_filter = inv_rep_fn_role_child.value();
		employee_data= [{code:"ALL",description:"ALL"}];
		executeService_retrieve_listof_functional_role_employee_list();
		inv_rep_emp_child.dataSource.data(employee_data);
	}
	
}
function setValue4()
{
	setValue();
	if(inv_map_fn_role_child.value() != "ALL")
	{
		fn_role_filter = inv_map_fn_role_child.value();
		employee_data= [{code:"ALL",description:"ALL"}];
		executeService_retrieve_listof_functional_role_employee_list();
		inv_map_emp_child.dataSource.data(employee_data);
	}
	
}
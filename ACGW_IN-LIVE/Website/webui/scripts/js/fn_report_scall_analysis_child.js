function fn_report_scall_analysis_child()
{

	scall_id_array_child=new Array();
	scall_id_array_child[0]='scall_organogram_level_no_child';
	scall_id_array_child[1]='scall_organogram_level_code_child';
	scall_id_array_child[2]='scall_sc_status_child';
	scall_id_array_child[3]='scall_sc_priority_child';
	
	scall_id_array_child[4]='scall_creation_year_child';
	scall_id_array_child[5]='scall_creation_qtr_child';
	scall_id_array_child[6]='scall_creation_month_child';
	scall_id_array_child[7]='scall_creation_wk_of_mth_child';
	scall_id_array_child[8]='scall_creation_day_of_wk_child';
	scall_id_array_child[9]='scall_assign_year_child';
	scall_id_array_child[10]='scall_assign_qtr_child';
	scall_id_array_child[11]='scall_assign_month_child';
	scall_id_array_child[12]='scall_assign_wk_of_mth_child';
	scall_id_array_child[13]='scall_assign_day_of_wk_child';
	scall_id_array_child[14]='scall_close_year_child';
	scall_id_array_child[15]='scall_close_qtr_child';
	scall_id_array_child[16]='scall_close_month_child';
	scall_id_array_child[17]='scall_close_wk_of_mth_child';
	scall_id_array_child[18]='scall_close_day_of_wk_child';
	scall_id_array_child[19]='scall_asset_child';
	scall_id_array_child[20]='scall_eq_id_child';
	scall_id_array_child[21]='scall_customer_id_child';
	scall_id_array_child[22]='scall_cause_code_child';
	scall_id_array_child[23]='scall_fn_role_child';
	scall_id_array_child[24]='scall_emp_child';
	
	scall_id_array_child[25]='scall_rep_fn_role_child';
	scall_id_array_child[26]='scall_rep_emp_child';
	scall_id_array_child[27]='scall_map_fn_role_child';
	scall_id_array_child[28]='scall_map_emp_child';
	
	var inputParameter ="";
	scall_organogram_level_no_child = InitializeDropDownListWithTransport("scall_organogram_level_no_child", "common_modules","retrieve_listof_org_levels", "p_level_name", "p_level_id",inputParameter,false,true,"setValue1");
	
	scall_organogram_level_no_child.bind("change",function()
	{
		text=this.text();
		scall_array_child[0]=this.value();
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
	
		scall_organogram_level_code_child.dataSource.data(org_entities_code);
		scall_organogram_level_code.dataSource.data(org_entities_code);
		}  
		else
		{
			org_entities_code = [{"text":"ALL",value:"ALL"}];
			scall_organogram_level_code_child.dataSource.data(org_entities_code);	
		}
		if(this.value() != "ALL")
		{
			scall_organogram_level_no.text(text);
			scall_organogram_level_no.enable(false); 
		}
		else
		{
			scall_organogram_level_no.text(text);
			scall_organogram_level_no.enable(true); 
		}
	});

	
	$("#scall_organogram_level_code_child").kendoDropDownList({
	dataTextField: "value",
    dataValueField: "value",
    dataSource:quarter_data,
	change:function()
	{
		text=this.text();
		scall_array_child[1]=this.value();
		if(this.value() != "ALL")
		{
			scall_organogram_level_code.text(text);
			scall_organogram_level_code.enable(false); 
		}
		else
		{
			scall_organogram_level_code.text(text);
			scall_organogram_level_code.enable(true); 
		}
	}
	
	});
	scall_organogram_level_code_child=$("#scall_organogram_level_code_child").data("kendoDropDownList");
	
	var inputParameter ="";
	scall_sc_status_child = InitializeDropDownListWithTransport("scall_sc_status_child", "mservice","retrieve_listof_scall_status_codes", "p_description", "p_status_code",inputParameter,false,true,"setValue");
	
	scall_sc_status_child.bind("change",function()
	{
		text=this.text();
		scall_array_child[2]=this.value();
		if(this.value() != "ALL")
		{
			scall_sc_status.text(text);
			scall_sc_status.enable(false); 
		}
		else
		{
			scall_sc_status.text(text);
			scall_sc_status.enable(true); 
		}
	});
	var inputParameter = {p_lov_code_type : "SCALPRIORITY", p_search_field_1 : "", p_search_field_2 : ""};
	scall_sc_priority_child = InitializeDropDownListWithTransport("scall_sc_priority_child", "common_modules","retrieve_listof_values_for_codes", "p_code_value_description","p_code_value",inputParameter,false,true,"setValue");
	
	scall_sc_priority_child.bind("change",function()
	{
		text=this.text();
		scall_array_child[3]=this.value();
		if(this.value() != "ALL")
		{
			scall_sc_priority.text(text);
			scall_sc_priority.enable(false); 
		}
		else
		{
			scall_sc_priority.text(text);
			scall_sc_priority.enable(true); 
		}
	});
	
	
	$("#scall_creation_year_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:year_data,
	change:function()
	{
		text=this.text();
		scall_array_child[4]=this.value();
		if(this.value() != "ALL")
		{
			scall_creation_year.text(text);
			scall_creation_year.enable(false); 
		}
		else
		{
			scall_creation_year.text(text);
			scall_creation_year.enable(true); 
		}
	}
	});
	scall_creation_year_child=$("#scall_creation_year_child").data("kendoDropDownList");
	$("#scall_creation_qtr_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:quarter_data,
	change:function()
	{
		text=this.text();
		scall_array_child[5]=this.value();
		if(this.value() != "ALL")
		{
			scall_creation_qtr.text(text);
			scall_creation_qtr.enable(false); 
		}
		else
		{
			scall_creation_qtr.text(text);
			scall_creation_qtr.enable(true); 
		}
	}
	
	});
	scall_creation_qtr_child=$("#scall_creation_qtr_child").data("kendoDropDownList");
	
	$("#scall_creation_month_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:month_data,
	change:function()
	{
		text=this.text();
		scall_array_child[6]=this.value();
		if(this.value() != "ALL")
		{
			scall_creation_month.text(text);
			scall_creation_month.enable(false); 
		}
		else
		{
			scall_creation_month.text(text);
			scall_creation_month.enable(true); 
		}
	}
	
	});
	scall_creation_month_child=$("#scall_creation_month_child").data("kendoDropDownList");
	
	$("#scall_creation_wk_of_mth_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:week_of_month_data,
	change:function()
	{
		text=this.text();
		scall_array_child[7]=this.value();
		if(this.value() != "ALL")
		{
			scall_creation_wk_of_mth.text(text);
			scall_creation_wk_of_mth.enable(false); 
		}
		else
		{
			scall_creation_wk_of_mth.text(text);
			scall_creation_wk_of_mth.enable(true); 
		}
	}
	
	});
	scall_creation_wk_of_mth_child=$("#scall_creation_wk_of_mth_child").data("kendoDropDownList");
	
	$("#scall_creation_day_of_wk_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:day_of_week_data,
	change:function()
	{
		text=this.text();
		scall_array_child[8]=this.value();
		if(this.value() != "ALL")
		{
			scall_creation_day_of_wk.text(text);
			scall_creation_day_of_wk.enable(false); 
		}
		else
		{
			scall_creation_day_of_wk.text(text);
			scall_creation_day_of_wk.enable(true); 
		}
	}
	});
	scall_creation_day_of_wk_child=$("#scall_creation_day_of_wk_child").data("kendoDropDownList");
	
	$("#scall_assign_year_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:year_data,
	change:function()
	{
		text=this.text();
		scall_array_child[9]=this.value();
		if(this.value() != "ALL")
		{
			scall_assign_year.text(text);
			scall_assign_year.enable(false); 
		}
		else
		{
			scall_assign_year.text(text);
			scall_assign_year.enable(true); 
		}
	}
	});
	scall_assign_year_child=$("#scall_assign_year_child").data("kendoDropDownList");
	$("#scall_assign_qtr_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:quarter_data,
	change:function()
	{
		text=this.text();
		scall_array_child[10]=this.value();
		if(this.value() != "ALL")
		{
			scall_assign_qtr.text(text);
			scall_assign_qtr.enable(false); 
		}
		else
		{
			scall_assign_qtr.text(text);
			scall_assign_qtr.enable(true); 
		}
	}
	
	});
	scall_assign_qtr_child=$("#scall_assign_qtr_child").data("kendoDropDownList");
	
	$("#scall_assign_month_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:month_data,
	change:function()
	{
		text=this.text();
		scall_array_child[11]=this.value();
		if(this.value() != "ALL")
		{
			scall_assign_month.text(text);
			scall_assign_month.enable(false); 
		}
		else
		{
			scall_assign_month.text(text);
			scall_assign_month.enable(true); 
		}
	}
	
	});
	scall_assign_month_child=$("#scall_assign_month_child").data("kendoDropDownList");
	
	$("#scall_assign_wk_of_mth_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:week_of_month_data,
	change:function()
	{
		text=this.text();
		scall_array_child[12]=this.value();
		if(this.value() != "ALL")
		{
			scall_assign_wk_of_mth.text(text);
			scall_assign_wk_of_mth.enable(false); 
		}
		else
		{
			scall_assign_wk_of_mth.text(text);
			scall_assign_wk_of_mth.enable(true); 
		}
	}
	
	});
	scall_assign_wk_of_mth_child=$("#scall_assign_wk_of_mth_child").data("kendoDropDownList");
	
	$("#scall_assign_day_of_wk_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:day_of_week_data,
	change:function()
	{
		text=this.text();
		scall_array_child[13]=this.value();
		if(this.value() != "ALL")
		{
			scall_assign_day_of_wk.text(text);
			scall_assign_day_of_wk.enable(false); 
		}
		else
		{
			scall_assign_day_of_wk.text(text);
			scall_assign_day_of_wk.enable(true); 
		}
	}
	});
	scall_assign_day_of_wk_child=$("#scall_assign_day_of_wk_child").data("kendoDropDownList");
	
	
	
	
	$("#scall_close_year_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:year_data,
	change:function()
	{
		text=this.text();
		scall_array_child[14]=this.value();
		if(this.value() != "ALL")
		{
			scall_close_year.text(text);
			scall_close_year.enable(false); 
		}
		else
		{
			scall_close_year.text(text);
			scall_close_year.enable(true); 
		}
	}
	});
	scall_close_year_child=$("#scall_close_year_child").data("kendoDropDownList");
	$("#scall_close_qtr_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:quarter_data,
	change:function()
	{
		text=this.text();
		scall_array_child[15]=this.value();
		if(this.value() != "ALL")
		{
			scall_close_qtr.text(text);
			scall_close_qtr.enable(false); 
		}
		else
		{
			scall_close_qtr.text(text);
			scall_close_qtr.enable(true); 
		}
	}
	
	});
	scall_close_qtr_child=$("#scall_close_qtr_child").data("kendoDropDownList");
	
	$("#scall_close_month_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:month_data,
	change:function()
	{
		text=this.text();
		scall_array_child[16]=this.value();
		if(this.value() != "ALL")
		{
			scall_close_month.text(text);
			scall_close_month.enable(false); 
		}
		else
		{
			scall_close_month.text(text);
			scall_close_month.enable(true); 
		}
	}
	
	});
	scall_close_month_child=$("#scall_close_month_child").data("kendoDropDownList");
	
	$("#scall_close_wk_of_mth_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:week_of_month_data,
	change:function()
	{
		text=this.text();
		scall_array_child[17]=this.value();
		if(this.value() != "ALL")
		{
			scall_close_wk_of_mth.text(text);
			scall_close_wk_of_mth.enable(false); 
		}
		else
		{
			scall_close_wk_of_mth.text(text);
			scall_close_wk_of_mth.enable(true); 
		}
	}
	
	});
	scall_close_wk_of_mth_child=$("#scall_close_wk_of_mth_child").data("kendoDropDownList");
	
	$("#scall_close_day_of_wk_child").kendoDropDownList({
	dataTextField: "text",
    dataValueField: "value",
    dataSource:day_of_week_data,
	change:function()
	{
		text=this.text();
		scall_array_child[18]=this.value();
		if(this.value() != "ALL")
		{
			scall_close_day_of_wk.text(text);
			scall_close_day_of_wk.enable(false); 
		}
		else
		{
			scall_close_day_of_wk.text(text);
			scall_close_day_of_wk.enable(true); 
		}
	}
	});
	scall_close_day_of_wk_child=$("#scall_close_day_of_wk_child").data("kendoDropDownList");
	
	
		var inputParameter ="";
	scall_asset_child = InitializeComboBoxWithTransport("scall_asset_child", "mservice","retrieve_listof_asset", "p_asset_description ", "p_asset_id",inputParameter,false,true,"setValue");
	
	scall_asset_child.bind("change",function()
	{
		text=this.text();
		scall_array_child[19]=this.value();
		if(this.value() != "ALL")
		{
			scall_asset.text(text);
			scall_asset.enable(false); 
		}
		else
		{
			scall_asset.text(text);
			scall_asset.enable(true); 
		}
	});
	
	var inputParameter ="";
	scall_eq_id_child = InitializeDropDownListWithTransport("scall_eq_id_child", "mservice","retrieve_listof_equipment", "p_description", "p_equipment_id",inputParameter,false,true,"setValue");
	
	scall_eq_id_child.bind("change",function()
	{
		text=this.text();
		scall_array_child[20]=this.value();
		if(this.value() != "ALL")
		{
			scall_eq_id.text(text);
			scall_eq_id.enable(false); 
		}
		else
		{
			scall_eq_id.text(text);
			scall_eq_id.enable(true); 
		}
	});
	var inputParameter ="";
	scall_customer_id_child = InitializeDropDownListWithTransport("scall_customer_id_child", "common_modules","retrieve_listof_customers", "p_customer_name", "p_customer_id",inputParameter,false,true,"setValue");
	
	scall_customer_id_child.bind("change",function()
	{
		text=this.text();
		scall_array_child[21]=this.value();
		if(this.value() != "ALL")
		{
			scall_customer_id.text(text);
			scall_customer_id.enable(false); 
		}
		else
		{
			scall_customer_id.text(text);
			scall_customer_id.enable(true); 
		}
	});
	
	var inputParameter = {p_lov_code_type : "SCALCAUSE", p_search_field_1 : "", p_search_field_2 : ""};
	scall_cause_code_child = InitializeDropDownListWithTransport("scall_cause_code_child", "common_modules","retrieve_listof_values_for_codes", "p_code_value_description", "p_code_value",inputParameter,false,true,"setValue");
	
	scall_cause_code_child.bind("change",function()
	{
		text=this.text();
		scall_array_child[22]=this.value();
		if(this.value() != "ALL")
		{
			scall_cause_code.text(text);
			scall_cause_code.enable(false); 
		}
		else
		{
			scall_cause_code.text(text);
			scall_cause_code.enable(true); 
		}
	});
	
	var inputParameter = {p_lov_code_type : "FR", p_search_field_1 : "", p_search_field_2 : ""};
	scall_fn_role_child = InitializeDropDownListWithTransport("scall_fn_role_child", "common_modules","retrieve_listof_values_for_codes", "p_code_value_description", "p_code_value",inputParameter,false,true,"setValue2");
	
	scall_fn_role_child.bind("change",function()
	{
		text=this.text();
		scall_array_child[23]=this.value();
		if(this.value() != "ALL")
		{
			scall_fn_role.text(text);
			scall_fn_role.enable(false); 
			fn_role_filter = this.value();
			employee_data= [{code:"ALL",description:"ALL"}];
			executeService_retrieve_listof_functional_role_employee_list();
			scall_emp_child.dataSource.data(employee_data);
		}
		else
		{
			scall_fn_role.text(text);
			scall_fn_role.enable(true); 
			scall_emp_child.value("ALL");
			employee_data= [{code:"ALL",description:"ALL"}];
			scall_emp_child.dataSource.data(employee_data);
		}
	});
	employee_data= [{code:"ALL",description:"ALL"}];
	$("#scall_emp_child").kendoComboBox({
	dataTextField: "code",
    dataValueField: "code",
    dataSource:employee_data,
	template:'${ data.code }'+'-'+'${ data.description }',
	change:function()
	{
		text=this.text();
		scall_array_child[24]=this.value();
		if(this.value() != "ALL")
		{
			scall_emp.text(text);
			scall_emp.enable(false); 
		}
		else
		{
			scall_emp.text(text);
			scall_emp.enable(true); 
		}
	}
	});
	scall_emp_child = $("#scall_emp_child").data("kendoComboBox");

	var inputParameter = {p_lov_code_type : "FR", p_search_field_1 : "", p_search_field_2 : ""};
	scall_rep_fn_role_child = InitializeDropDownListWithTransport("scall_rep_fn_role_child", "common_modules","retrieve_listof_values_for_codes", "p_code_value_description", "p_code_value",inputParameter,false,true,"setValue3");
	
	scall_rep_fn_role_child.bind("change",function()
	{
		text=this.text();
		scall_array_child[25]=this.value();
		if(this.value() != "ALL")
		{
			scall_rep_fn_role.text(text);
			scall_rep_fn_role.enable(false);
			fn_role_filter = this.value();
			employee_data= [{code:"ALL",description:"ALL"}];
			executeService_retrieve_listof_functional_role_employee_list();
			scall_rep_emp_child.dataSource.data(employee_data);
		}
		else
		{
			scall_rep_emp_child.value("ALL");
			scall_rep_fn_role.text(text);
			scall_rep_fn_role.enable(true); 
			employee_data= [{code:"ALL",description:"ALL"}];
			scall_rep_emp_child.dataSource.data(employee_data);
		}
	});
	
	$("#scall_rep_emp_child").kendoComboBox({
	dataTextField: "code",
    dataValueField: "code",
    dataSource:employee_data,
	template:'${ data.code }'+'-'+'${ data.description }',
	change:function()
	{
		text=this.text();
		scall_array_child[26]=this.value();
		if(this.value() != "ALL")
		{
			scall_rep_emp.text(text);
			scall_rep_emp.enable(false); 
		}
		else
		{
			scall_rep_emp.text(text);
			scall_rep_emp.enable(true); 
		}
	}
	});
	scall_rep_emp_child = $("#scall_rep_emp_child").data("kendoComboBox");
	
	
	
	var inputParameter = {p_lov_code_type : "FR", p_search_field_1 : "", p_search_field_2 : ""};
	scall_map_fn_role_child = InitializeDropDownListWithTransport("scall_map_fn_role_child", "common_modules","retrieve_listof_values_for_codes", "p_code_value_description", "p_code_value",inputParameter,false,true,"setValue4");
	
	scall_map_fn_role_child.bind("change",function()
	{
		text=this.text();
		scall_array_child[27]=this.value();
		if(this.value() != "ALL")
		{
			scall_map_fn_role.text(text);
			scall_map_fn_role.enable(false);
			fn_role_filter = this.value();
			employee_data= [{code:"ALL",description:"ALL"}];
			executeService_retrieve_listof_functional_role_employee_list();
			scall_map_emp_child.dataSource.data(employee_data);
		}
		else
		{
			scall_map_emp_child.value("ALL");
			scall_map_fn_role.text(text);
			scall_map_fn_role.enable(true);
			employee_data= [{code:"ALL",description:"ALL"}];
			scall_map_emp_child.dataSource.data(employee_data);			
		}
	});
	
	$("#scall_map_emp_child").kendoComboBox({
	dataTextField: "code",
    dataValueField: "code",
    dataSource:employee_data,
	template:'${ data.code }'+'-'+'${ data.description }',
	change:function()
	{
		text=this.text();
		scall_array_child[28]=this.value();
		if(this.value() != "ALL")
		{
			scall_map_emp.text(text);
			scall_map_emp.enable(false); 
		}
		else
		{
			scall_map_emp.text(text);
			scall_map_emp.enable(true); 
		}
	}
	});
	scall_map_emp_child = $("#scall_map_emp_child").data("kendoComboBox");
	scall_emp_child.value("ALL");
	scall_rep_emp_child.value("ALL");
	scall_map_emp_child.value("ALL");
	$('#report_scall_analysis_child_set').on("click",function()
	{
		for(i=0;i<scall_array_child.length;i++)
		{
		scall_array[i]=scall_array_child[i];
		}
		child_window.close();
	});


	$('#report_scall_analysis_child_reset').on("click",function()
	{
	for(i=0;i<scall_id_array_child.length;i++)
	{
		eval(scall_id_array_child[i]+'.value("ALL")');
		eval(scall_id_array[i]+'.text("ALL")');
		eval(scall_id_array[i]+'.enable(true)');
	}
	for(i=0;i<scall_array_child.length;i++)
	{
		scall_array_child[i] = "ALL";
	}
	});

	$('#report_scall_analysis_child_cancel').on("click",function()
	{
		child_window.close();
	});

}
function setValue()
{
	for(i=0;i<scall_array.length;i++)
	{
	if(scall_array[i] != 'ALL')
	{
	eval(scall_id_array_child[i]+'.value('+'"'+scall_array[i]+'"'+')');
	}
	}
}
function setValue1()
{
	setValue();
	if(scall_organogram_level_no_child.value() != "ALL")
	{
		org_entity_type =scall_organogram_level_no_child.value();
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
	
		scall_organogram_level_code_child.dataSource.data(org_entities_code);
	}
	
}
function setValue2()
{
	setValue();
	if(scall_fn_role_child.value() != "ALL")
	{
		fn_role_filter = scall_fn_role_child.value();
		employee_data= [{code:"ALL",description:"ALL"}];
		executeService_retrieve_listof_functional_role_employee_list();
		scall_emp_child.dataSource.data(employee_data);
	}
	
}
function setValue3()
{
	setValue();
	if(scall_rep_fn_role_child.value() != "ALL")
	{
		fn_role_filter = scall_rep_fn_role_child.value();
		employee_data= [{code:"ALL",description:"ALL"}];
		executeService_retrieve_listof_functional_role_employee_list();
		scall_rep_emp_child.dataSource.data(employee_data);
	}
	
}
function setValue4()
{
	setValue();
	if(scall_map_fn_role_child.value() != "ALL")
	{
		fn_role_filter = scall_map_fn_role_child.value();
		employee_data= [{code:"ALL",description:"ALL"}];
		executeService_retrieve_listof_functional_role_employee_list();
		scall_map_emp_child.dataSource.data(employee_data);
	}
	
}
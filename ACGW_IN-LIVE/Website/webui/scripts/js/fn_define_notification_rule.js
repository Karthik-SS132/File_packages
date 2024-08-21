function fn_define_notification_rule_loadScripts()
{	
	return true;
}
function fn_define_notification_rule()
{	
	//initial_screen_load_ind = 0;
	/* DEFINE NOTIFICATION RULE DATASOURCE 1 */
	define_notification_rule_datasource_1 = new kendo.data.DataSource(
	{
		pageSize: 10,
		serverPaging: true,
		transport: 
		{
			read: 
			{
				type: "POST",
				dataType: 'json',
				contentType: "application/json; charset=utf-8",				
				url: GetTransportUrl("common_modules","retrieve_manage_company_notification_rules","context/outputparam_detail"),
				complete: function(data, textstatus)
				{
					var returnValue = ProcessTransportResponse(data, textstatus);
				}
			},
			parameterMap: function(data, type) 
			{	
				if (type == "read") 
				{	
					return GetTransportParameter({inputparam: {p_inputparam_xml: ""}});
				}
			}
		},
		schema: 
		{
			model: 
			{
				id: "rule_gen_id",
				fields: 
				{
					rule_gen_id: {editable: true},
					txn_type_code: {editable: true},
					txn_subtype_code: {editable: true},
					req_category: {editable: true},
					req_type: {editable: true},
					org_level_no: {editable: true},
					org_level_code: {editable: true},
					company_loc_code: {editable: true},
					attach_type: {editable: true},
					time_interval: {editable: true},
					time_interval_uom: {editable: true},
					time_interval_from_code: {editable: true},
					txn_type_code_description: {codeType: "TXNTYPE", codeField: "txn_type_code"},
					txn_subtype_code_description: {codeType: "TXNSUBTYPE", codeField: "txn_subtype_code"},
					req_category_description: {codeType: "CALLCATEGORY", codeField: "req_category"},
					req_type_description: {codeType: "CALLTYPE", codeField: "req_type"},
					org_level_no_description: {codeType: "ORGLEVELNO", codeField: "org_level_no"},
					org_level_code_description: {codeType: "ORGLEVELCODE", codeField: "org_level_code"},
					company_loc_code_description: {codeType: "COMPANYLOCATION", codeField: "company_loc_code"},
					attach_type_description: {codeType: "NRATTACHTYPE", codeField: "attach_type"},
					time_interval_uom_description: {codeType: "TDURUOM", codeField: "time_interval_uom"}
				}
			},
			parse: function(response)
			{
				return GetDescriptionFieldsForDataSource(response, define_notification_rule_datasource_1);
			}
		}
	});	
	/* GRID INITIALIZATION */
	define_notification_rule_grid_1 = InitializeKendoGrid(
	{
		sectionID: "define_notification_rule_detail_1",
		toolbar: "define_notification_rule_grid_1_toolbar_template",
		dataSource: define_notification_rule_datasource_1,
		height: 380,
		pageSize: 8
	});
	/*ADD BUTTON CLICK*/
	$("#define_notification_rule_add_btn").click(function()
	{
		fn_define_notification_rule_add_btn_click();
	});
	/*EDIT BUTTON CLICK*/
	$("#define_notification_rule_edit_btn").click(function()
	{
		fn_define_notification_rule_edit_btn_click();
	});
	/* LABEL CONFIGURATION */
	ApplyConfiguredLabels("define_notification_rule");
}
/* ADD BUTTON */
function fn_define_notification_rule_add_btn_click()
{
	if(LoadJSScripts(["./webui/scripts/js/fn_define_notification_rule_edit.js","../../s_iscripts/save_manage_company_notification_rule.js"]))
	{
		crud_indicator = "A";
		displayLabel = 'Add';
		$.get('define_notification_rule_edit.html', function(data)
		{							
			$("#define_notification_rule").hide();
			$("#container").append(data);
			fn_define_notification_rule_edit();
		});
	}
	else
	{
		alert("Sorry. This featue is unavailable. Please contact your support desk.");
	}
}
/* EDIT BUTTON */
function fn_define_notification_rule_edit_btn_click()
{
	if(define_notification_rule_grid_1.select().length != 0)
	{
		if(LoadJSScripts(["./webui/scripts/js/fn_define_notification_rule_edit.js","../../s_iscripts/save_manage_company_notification_rule.js","../../s_iscripts/retrieve_manage_company_notification_rule_details.js"]))
		{
			crud_indicator = "U";
			displayLabel = 'Edit';
			$.get('define_notification_rule_edit.html', function(data)
			{							
				$("#define_notification_rule").hide();
				$("#container").append(data);
				fn_define_notification_rule_edit();
			});
		}
		else
		{
			alert("Sorry. This featue is unavailable. Please contact your support desk.");
		}
	}
	else
	{
		alert("No row has been selected.");
	}
}
/* GRID REFRESH */
function fn_define_notification_rule_refresh()
{
	define_notification_rule_datasource_1.read();
}
function fn_define_notification_rule_PreImport()
{
	return true;
}
function fn_define_notification_rule_PostImport()
{
	return true;
}
function fn_define_notification_rule_PreExport()
{
	exportConfiguration = {
		mode:'single',
		content:[{
			exportType:"grid",
			fieldId:"define_notification_rule_grid_1",
			dispalyLabel:"Data Export"
		}]
	};
	return exportConfiguration;
}
function fn_define_notification_rule_PostExport()
{
	return true;
}
function fn_define_notification_rule_PrePrint()
{
	printConfiguration = {
		mode:'single',
		content:[{
			type:"grid",
			fieldId:"define_notification_rule_grid_1",
			dispalyLabel:"Data Print"
		}]
	};
	return printConfiguration;
}
function fn_define_notification_rule_PostPrint()
{
	return true;
}
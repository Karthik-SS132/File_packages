function fn_manage_data_access_profile_loadScripts()
{
	var jsScriptsToLoad = [];
	jsScriptsToLoad = [  "../../s_iscripts/retrieve_listof_values_for_codes.js",
						 "../../s_iscripts/retrieve_manage_data_access_profile.js",
						 "../../s_iscripts/validate_key_field.js",
						 "../../s_iscripts/save_manage_data_access_profile.js",
						 "../../s_iscripts/retrieve_listof_org_level_codes.js",
						 "../../s_iscripts/retrieve_listof_company_country_locations.js",
						 "../../s_iscripts/retrieve_listof_org_levels.js",
						 "../../s_iscripts/retrieve_listof_employees.js",
						 "./webui/scripts/js/fn_manage_data_access_profile_edit.js",
						 "./webui/scripts/js/fn_manage_data_access_profile_edit_events.js"
					  ];
				
	var loadRetStatus = loadJSScripts(jsScriptsToLoad);
	
	if (loadRetStatus == 1)		return false;
	
	return true;
}
function ondataaccessprofileRefresh()
{
	try
	{
		fn_manage_data_access_profile_edit();
	}
	catch(err)
	{
		console.log(err.message);
		alert('E_LO_1005: Unable to load required files. Please contact your support desk.');
		manage_data_access_profile_child.data("kendoWindow").close();
	}
}
function ondataaccessprofileClose() 
{
	$('#manage_data_access_profile_edit').remove();
}
function fn_manage_data_access_profile()
{
	screenChangeInd = '';
	selected_row = 0;
	code_type = 'DPRF_ACCCD';
	search_field_1 = '';
	search_field_2 = '';
	list_of_codes = [];
	list_of_codes.push({code:'ALL',description:'ALL'});
	executeService_retrieve_listof_values_for_codes();
	
	data_access_profile_dsource_data = new kendo.data.DataSource();
	
	$("#manage_data_access_profile_event_type").kendoDropDownList({
		optionLabel:"---Select---",
		dataTextField: "description",
		dataValueField: "code",
		dataSource:list_of_codes ,
		template:'${data.code}'+'-'+'${data.description}',
		close:function()
		{
			access_for_event = this.value();
			var data_access_profile_list = executeService_retrieve_manage_data_access_profile();
			if (data_access_profile_list.header == 'SP001')
	        {
				manage_data_access_profile_grid.dataSource.data('');
				return false;
			}
			else
			{
				data_access_profile_list_xml = loadXMLString(data_access_profile_list.detail);
				data_access_profile_dsource = new kendo.data.DataSource({
					data: data_access_profile_list_xml,
					pageSize: 10,
					schema: {
						type: "xml",
						data: "list/da_profile_record",
						model: {
							fields: {
								access_for_event: "access_for_event/text()",
								level1_code:"level1_code/text()",
								level2_code:"level2_code/text()",
								level3_code:"level3_code/text()",
								level4_code:"level4_code/text()",
								level5_code:"level5_code/text()",
								location_code: "location_code/text()",
								request_category: "request_category/text()",
								request_type: "request_type/text()",
								id_type: "id_type/text()",
								id_org_level_no: "id_org_level_no/text()",
								id_code: "id_code/text()",
								rec_tstamp: "rec_tstamp/text()"
							}
						}
					}
				});
				data_access_profile_dsource.read(); 
				data_access_profile_dsource_data = data_access_profile_dsource.data();
				manage_data_access_profile_grid.dataSource.data(data_access_profile_dsource_data);
				
				$('#manage_data_access_profile_edit_btn').attr('disabled',false);
				$('#manage_data_access_profile_delete_btn').attr('disabled',false);
			}
		}
	});
	manage_data_access_profile_event_type_dd = $("#manage_data_access_profile_event_type").data('kendoDropDownList');
	
	var grid_column_arr ='['+
					'{ field:"access_for_event", title: "Access", width: "25px",template:\'# if (kendo.toString(access_for_event) == "") {# #} else {# ${ access_for_event} #}#\' },';
					for(var i=1; i<=login_profile.no_of_org_level; i++)
					{
						grid_column_arr += '{ field:"level'+i+'_code", title: "Level '+i+'", width: "20px",template:\'# if (kendo.toString(level'+i+'_code) == "") {# NA #} else {# ${ level'+i+'_code} #}#\' },';
					}
					/*'{ field:"level2_code", title: "Level 2", width: "20px",template:\'# if (kendo.toString(level2_code) == "") {# NA #} else {# ${ level2_code} #}#\' },'+
					'{ field:"level3_code", title: "Level 3", width: "20px",template:\'# if (kendo.toString(level3_code) == "") {# NA #} else {# ${ level3_code} #}#\'},'+
					'{ field:"level4_code", title: "Level 4", width: "20px",template:\'# if (kendo.toString(level4_code) == "") {# NA #} else {# ${ level4_code} #}#\' },'+
					'{ field:"level5_code", title: "Level 5", width: "20px",template:\'# if (kendo.toString(level5_code) == "") {# NA # } else {# ${ level5_code} #}#\'},'+*/
 grid_column_arr += '{ field:"location_code", title: "Location", width: "18px",template:\'# if (kendo.toString(location_code) == "") {# #} else {# ${ location_code} #}#\' },'+
					'{ field:"request_category", title: "Category", width: "20px",template:\'# if (kendo.toString(request_category) == "") {# #} else {# ${ request_category} #}#\' },'+
					'{ field:"request_type", title: "Type", width: "18px",template:\'# if (kendo.toString(request_type) == "") {# #} else {# ${ request_type} #}#\' },'+
					'{ field:"id_type", title: "ID Type", width: "20px",template:\'# if (kendo.toString(id_type) == "") {# #} else {# ${ id_type} #}#\' },'+
					'{ field:"id_org_level_no", title: "Org. Level", width: "20px",template:\'# if (kendo.toString(id_org_level_no) == "") {# #} else {# ${ id_org_level_no} #}#\' },'+
					'{ field:"id_code", title: "ID Code", width: "20px",template:\'# if (kendo.toString(id_code) == "") {# #} else {# ${ id_code} #}#\' },'+
				']';
	$("#manage_data_access_profile_grid").kendoGrid({
        dataSource: data_access_profile_dsource_data,
        pageable: true,
        height: 400,
		sortable: true,
        selectable:true,
		toolbar: kendo.template($("#manage_data_access_profile-template").html()),
        columns: eval(grid_column_arr),
				change:function()
				{
				    selected_row=this.select();
				    daprof_selected_uid = selected_row.data("uid");
				    selected_daprof_rowmodel = data_access_profile_dsource.getByUid(daprof_selected_uid);		
				}								
	});
	manage_data_access_profile_grid = $("#manage_data_access_profile_grid").data("kendoGrid");
	/*for(var i=login_profile.no_of_org_level; i<=manage_data_access_profile_grid.columns.length; i++)
	{
		var lvlc = 'level'+i+'_code';
		if(manage_data_access_profile_grid.columns[i].field == lvlc)
		{
			manage_data_access_profile_grid.hideColumn(i);
		}
	}*/
	
	$("#manage_data_access_profile_add_btn").on("click",function()
	{
		isScreenEditable=true;
		save_mode = 'A';
		value_changed_ind = false;
		mn_acc_for_event_filt = manage_data_access_profile_event_type_dd.value();
		manage_data_access_profile_child= $("#manage_data_access_profile_child");
			manage_data_access_profile_child.kendoWindow({
						    width: "550px",
                            actions: ["Close"],
							draggable: false,
							height: "550px",
							modal: true,
							resizable: false,
							close: ondataaccessprofileClose,
							refresh:ondataaccessprofileRefresh
            });
		manage_data_access_profile_child.data("kendoWindow").center();		
		manage_data_access_profile_child.data("kendoWindow").refresh("manage_data_access_profile_edit.html");
		manage_data_access_profile_child .data("kendoWindow").title("Manage Data Access Profile - Add");						  
		manage_data_access_profile_child.data("kendoWindow").open();
		

	}); 
	
	$("#manage_data_access_profile_edit_btn").on("click",function()
	{
		if (selected_row == 0)
		{
			alert('No Row has been selected');
		}
		else
		{
			isScreenEditable=true;
			save_mode = 'U';
			value_changed_ind = false;
			mn_acc_for_event_filt = manage_data_access_profile_event_type_dd.value();
			manage_data_access_profile_child= $("#manage_data_access_profile_child");
				manage_data_access_profile_child.kendoWindow({
								width: "550px",
								actions: ["Close"],
								draggable: false,
								height: "550px",
								modal: true,
								resizable: false,
								close: ondataaccessprofileClose,
								refresh:ondataaccessprofileRefresh
				});
			manage_data_access_profile_child.data("kendoWindow").center();	
			manage_data_access_profile_child.data("kendoWindow").refresh("manage_data_access_profile_edit.html");
			manage_data_access_profile_child .data("kendoWindow").title("Manage Data Access Profile - Edit");						  
			manage_data_access_profile_child.data("kendoWindow").open();
			
		}
	}); 
	
	$("#manage_data_access_profile_delete_btn").on("click",function()
	{
		if (selected_row == 0)
		{
			alert('No Row has been selected');
		}
		else
		{
			var isClose = confirm("Are you sure you want to delete the record?");
			if (isClose == true)
			{
				save_mode = 'D';
				p_access_for_event = selected_daprof_rowmodel.access_for_event;
				if(selected_daprof_rowmodel.level1_code != undefined)
				{
					p_level1_code = selected_daprof_rowmodel.level1_code;
				}
				else
				{
					p_level1_code = '';
				}
				if(selected_daprof_rowmodel.level2_code != undefined)
				{
					p_level2_code = selected_daprof_rowmodel.level2_code;
				}
				else
				{
					p_level2_code = '';
				}
				if(selected_daprof_rowmodel.level3_code != undefined)
				{
					p_level3_code = selected_daprof_rowmodel.level3_code;
				}
				else
				{
					p_level3_code = '';
				}
				if(selected_daprof_rowmodel.level4_code != undefined)
				{
					p_level4_code = selected_daprof_rowmodel.level4_code;
				}
				else
				{
					p_level4_code = '';
				}
				if(selected_daprof_rowmodel.level5_code != undefined)
				{
					p_level5_code = selected_daprof_rowmodel.level5_code;
				}
				else
				{
					p_level5_code = '';
				}
				p_location_code = selected_daprof_rowmodel.location_code;
				p_request_category = selected_daprof_rowmodel.request_category;
				if(selected_daprof_rowmodel.request_type != undefined)
				{
					p_request_type = selected_daprof_rowmodel.request_type;
				}
				else
				{
					p_request_type = '';
				}
				p_id_type = selected_daprof_rowmodel.id_type;
				if(selected_daprof_rowmodel.id_org_level_no != undefined)
				{
					p_org_level_no = selected_daprof_rowmodel.id_org_level_no;
				}
				else
				{
					p_org_level_no = '';
				}
				p_id_code = selected_daprof_rowmodel.id_code;
				p_rec_timestamp = selected_daprof_rowmodel.rec_tstamp;
				
				executeService_save_manage_data_access_profile();
				
				if(update_status == 'SP001')
				{
					data_access_profile_dsource_data.remove(selected_daprof_rowmodel);
				}
			}
		}
	});
}
function fn_manage_data_access_profile_PreImport()
{
	return true;
}
function fn_manage_data_access_profile_PostImport()
{
	return true;
}
function fn_manage_data_access_profile_PreExport()
{
	exportConfiguration = {
		mode:'single',
		content:[{
			exportType:"grid",
			fieldId:"manage_data_access_profile_grid",
			dispalyLabel:"Data Export"
		}]
	};
	return exportConfiguration;
}
function fn_manage_data_access_profile_PostExport()
{
	return true;
}
function fn_manage_data_access_profile_PrePrint()
{
	printConfiguration = {
		mode:'single',
		content:[{
			type:"grid",
			fieldId:"manage_data_access_profile_grid",
			dispalyLabel:"Data Export"
		}]
	};
	return printConfiguration;
}
function fn_manage_data_access_profile_PostPrint()
{
	return true;
}
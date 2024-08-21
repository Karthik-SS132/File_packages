function fn_manage_company_notifications_loadScripts()
{
	var jsScriptsToLoad = [];
	jsScriptsToLoad = [  "../../s_iscripts/retrieve_manage_company_notification_list.js",
						 "../../s_iscripts/retrieve_manage_company_notification_mode_list.js",
						 "../../s_iscripts/retrieve_manage_company_notification_mode_recipient_list.js",
						 "../../s_iscripts/save_manage_company_notification.js",
						 "../../s_iscripts/save_manage_company_notification_mode.js",
						 "./webui/scripts/js/fn_manage_company_notifications_child.js",
						 "./webui/scripts/js/fn_manage_company_notifications_mode.js",
						 "./webui/scripts/js/fn_manage_company_notifications_mode_child.js",
						 "./webui/scripts/js/fn_manage_company_notifications_mode_recipients.js",
						 "./webui/scripts/js/fn_manage_company_notifications_mode_recipients_child.js",
						 "../../s_iscripts/retrieve_listof_org_level_codes.js",
						 "../../s_iscripts/retrieve_listof_org_levels.js",
						 //"../../s_iscripts/retrieve_listof_employees.js",
						 "../../s_iscripts/save_manage_company_notification_recipients.js",
						 "../../s_iscripts/save_manage_company_notification_enable_disable.js"
					  ];
				
	var loadRetStatus = loadJSScripts(jsScriptsToLoad);
	
	if (loadRetStatus == 1)		return false;
	
	return true;
}
function fn_manage_company_notifications()
{
	save_mode_notification = "";
	screenInd  = "";
	/* VARIABLE INITIALIZATION */
	manage_company_notifications_child = $("#window");
	fn_refresh_manage_company_notifications_grid();
	
	/* ADD BUTTON CLICK */
	$("#manage_company_notifications_add_btn").click(function()
	{
		save_mode_notification="A";
		var oncompanyNotificationClose = function()
		{
			$("#manage_company_notifications_child").remove();
		}
		manage_company_notifications_child.kendoWindow(
		{
			width:"525px",
			actions: ["Close"],
			draggable: false,
			scrollable:false,
			height: "300px",
			modal: true,
			refresh:oncompanyNotificationRefresh,
			resizable: false,
			close: oncompanyNotificationClose
		});
		screenName="manage_company_notifications_child";
		manage_company_notifications_child.data("kendoWindow").refresh('./manage_company_notifications_child.html');
		manage_company_notifications_child.data("kendoWindow").title("Add");
		manage_company_notifications_child.data("kendoWindow").open();
		manage_company_notifications_child.data("kendoWindow").center();
		function oncompanyNotificationRefresh()
		{
			try
			{
				eval('fn_'+screenName+'()');					
			}
			catch(err)
			{
				alert('E_LO_1005: Unable to load required files. Please contact your support desk.');
				manage_company_notifications_child.data("kendoWindow").close();
			}
		}
	});
	
	/* ENABLE,DISABLE BUTTON CLICK */
	$("#manage_company_notifications_manage_company_notifications_enable_disable_btn").click(function()
	{
		if (selected == 0)
		{
			alert("No row has been selected");
		}
		else
		{
			var isActDeact = confirm("Do you want to Enable/Disable?");
			if (isActDeact == true)
			{
				Notification_Event_Code = selected_model['n_event_code'];
				if(selected_model['n_active_ind'] =='1')
				{
					Notification_Activate_Indicator = '0';
				}
				else if(selected_model['n_active_ind'] == '0')
				{
					Notification_Activate_Indicator = '1';
				}
				return_value  = executeService_save_manage_company_notification_enable_disable();
				fn_refresh_manage_company_notifications_grid();
			}
		}		
	});
	
	/* EDIT BUTTON CLICK */
	$("#manage_company_notifications_edit_btn").click(function()
	{
		if (selected == 0)
		{
			alert("No row has been selected");
		}
		else
		{
			save_mode_notification="U";
			var oncompanyNotificationClose = function()
			{
				$("#manage_company_notifications_child").remove();
			}
			manage_company_notifications_child.kendoWindow(
			{
				width:"500px",
				actions: ["Close"],
				draggable: false,
				scrollable:false,
				height: "300px",
				modal: true,
				refresh:oncompanyNotificationRefresh,
				resizable: false,
				close: oncompanyNotificationClose
			});
			screenName="manage_company_notifications_child";
			manage_company_notifications_child.data("kendoWindow").refresh('./manage_company_notifications_child.html');
			manage_company_notifications_child.data("kendoWindow").title("Edit");
			manage_company_notifications_child.data("kendoWindow").open();
			manage_company_notifications_child.data("kendoWindow").center();
			function oncompanyNotificationRefresh()
			{
				try
				{
					eval('fn_'+screenName+'()');					
				}
				catch(err)
				{
					alert('E_LO_1005: Unable to load required files. Please contact your support desk.');
					manage_company_notifications_child.data("kendoWindow").close();
				}
			}
		}
	});
	
	/* NOTIFICATION MODE BUTTON CLICK */
	$('#manage_company_notifications_manage_company_notifications_mode_btn').on('click', function()
	{
		if (selected == 0)
		{
			alert("No row has been selected");
		}
		else
		{
			displayLabel = 'Mode';
			isScreenEditable = true;
			screenName = 'manage_company_notifications_mode';
			divID = screenName;
			$.cachedScript("../../webui/scripts/js/fn_"+screenName+".js").done(function()
			{
				$('#container').load(screenName+".html",function()
				{
					try
					{
						eval('fn_'+screenName+'()');
					}
					catch(err)
					{
						eval('$("#'+screenID+'").hide()')
						alert('E_LO_1004: Unable to load required files. Please contact your support desk.');
						removeScreen();
					}
				});
			})
			
			.fail(function(jqxhr, settings, exception) 
			{
				$("#container" ).text("Loading Manage Service Details Screen Failed.. Contact Your Support Desk");
			});
		}
	});
	
	/* DELETE BUTTON CLICK */
	$('#manage_company_notifications_delete_btn').on('click', function()
	{
		if (selected == 0)
		{
			alert("No row has been selected");
		}
		else
		{
			var isActDeact = confirm("Do you want to Delete?");
			if (isActDeact == true)
			{
				Notification_Event_Code = selected_model['n_event_code'];
				Notification_Event_Desc = selected_model['n_description'];
				rec_tstamp = selected_model['rec_tstamp'];
				save_mode_notification = "D";
				return_value  = executeService_save_manage_company_notification();
				fn_refresh_manage_company_notifications_grid();
			}
		}
	});
}
function fn_refresh_manage_company_notifications_grid()
{
	/* VARIABLE INITIALIZATION */
	selected = 0;
	/* DATA SOURCE INITIALIZATION - MANAGE EQUIPMENT SERVICE CONTRACT TEMPLATE */
	manage_company_notifications_list = executeService_retrieve_manage_company_notification_list();
	manage_company_notifications_list_xml = loadXMLString(manage_company_notifications_list);
	manage_company_notifications_datasource = new kendo.data.DataSource(
	{
		data : manage_company_notifications_list_xml,
		pageSize : 10,
		schema :
		{
			type :"xml",
			data : "list/notification",
			model : 
			{
				fields :
				{
					slno : "slno/text()",
					n_event_code : "n_event_code/text()",
					n_description : "n_description/text()",
					n_active_ind : "n_active_ind/text()",
					rec_tstamp : "rec_tstamp/text()"
				}
			}
		}
	});
	
	/* ADDING SERIAL NUMBER ON THE GRID */
	manage_company_notifications_datasource.read();
    manage_company_notifications_datasource_data = manage_company_notifications_datasource.data();
	
	for(var c=0;c<manage_company_notifications_datasource_data.length;c++)
	{
		var count = c+1;
		manage_company_notifications_datasource_data[c].slno = count;
	}
	
	/*GRID INITIALIZATION - MANAGE EQUIPMENT SERVICE CONTRACT TEMPLATE */
	$("#manage_company_notifications_grid").kendoGrid(
	{
		dataSource : manage_company_notifications_datasource,
		selectable : true,
		pageable : true,
		pageSize : 10,
		height : 380,
		toolbar : kendo.template($("#manage_company_notifications_grid_toolbar").html()),
		columns : 
		[
			{
				field : "slno",
				title : "Slno",
				template: '# if (kendo.toString(slno) == "") {# #} else{# ${slno} #}#',
				width : "40px",
			},
			{
				field : "n_description",
				title : "Notifications",
				template: '# if (kendo.toString(n_description) == "") {# #} else{# ${n_description} #}#',
				width : "",
			},
			{
				field : "n_active_ind",
				title : "Status",
				template: '# if (kendo.toString(n_active_ind) == "1") {# Enabled #} else{# Disabled #}#',
				width : "",
			}
		],
		change : function()
		{
			selected = this.select();
			selected_uid = selected.data("uid");
			selected_model = manage_company_notifications_datasource.getByUid(selected_uid);
			if(selected_model['n_active_ind'] == "1") {
				$("#manage_company_notifications_manage_company_notifications_mode_btn").attr("disabled",false);
			}
			else {
				$("#manage_company_notifications_manage_company_notifications_mode_btn").attr("disabled",true);
			}
		}
	});
}
function fn_manage_company_notifications_PreImport()
{
	return true;
}
function fn_manage_company_notifications_PostImport()
{
	return true;
}
function fn_manage_company_notifications_PreExport()
{
	exportConfiguration = {
		mode:'single',
		content:[{
			exportType:"grid",
			fieldId:"manage_company_notifications_grid",
			dispalyLabel:"Data Export"
		}]
	};
	return exportConfiguration;
}
function fn_manage_company_notifications_PostExport()
{
	return true;
}
function fn_manage_company_notifications_PrePrint()
{
	printConfiguration = {
		mode:'single',
		content:[{
			type:"grid",
			fieldId:"manage_company_notifications_grid",
			dispalyLabel:"Data Print"
		}]
	};
	return printConfiguration;
}
function fn_manage_company_notifications_PostPrint()
{
	return true;
}
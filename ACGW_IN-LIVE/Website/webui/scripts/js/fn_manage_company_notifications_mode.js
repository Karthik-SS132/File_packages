function fn_manage_company_notifications_mode()
{
	save_mode_notification_mode = "";
	
	/* ASSIGNING NAVIGATION PATH */
	screenChangeInd = "";
	if(screenInd == "")
	{
		assignScreenName(divID, screenID);
		screenID ='manage_company_notifications_mode';
		divID = screenID;
		$("#"+parentScreenID).remove();
		AddToNavigationMap(divID, screenID, displayLabel,  parentScreenID);
	}
	
	/* VARIABLE INITIALIZATION */
	manage_company_notifications_mode_child = $("#window");
	$("#mange_com_noti_child_noti_evt_desc").text(selected_model['n_description']);
	fn_refresh_manage_company_notifications_mode_grid();
	
	/* ADD BUTTON CLICK */
	$("#manage_company_notifications_mode_add_btn").click(function()
	{
		save_mode_notification_mode="A";
		var onClose = function()
		{
			$("#manage_company_notifications_mode_child").remove();
		}
		manage_company_notifications_mode_child.kendoWindow(
		{
			width:"500px",
			actions: ["Close"],
			draggable: false,
			scrollable:false,
			height: "350px",
			modal: true,
			refresh:onref,
			resizable: false,
			close: onClose
		});
		screenName="manage_company_notifications_mode_child";
		manage_company_notifications_mode_child.data("kendoWindow").refresh('./manage_company_notifications_mode_child.html');
		manage_company_notifications_mode_child.data("kendoWindow").title("Add");
		manage_company_notifications_mode_child.data("kendoWindow").open();
		manage_company_notifications_mode_child.data("kendoWindow").center();
		function onref()
		{
			try
			{
				eval('fn_'+screenName+'()');					
			}
			catch(err)
			{
				alert('E_LO_1005: Unable to load required files. Please contact your support desk.');
				manage_company_notifications_mode_child.data("kendoWindow").close();
			}
		}
	});
	
	/* EDIT BUTTON CLICK */
	$("#manage_company_notifications_mode_edit_btn").click(function()
	{
		if (selected_noti_mode == 0)
		{
			alert("No row has been selected");
		}
		else
		{
			save_mode_notification_mode="U";
			var onClose = function()
			{
				$("#manage_company_notifications_mode_child").remove();
			}
			manage_company_notifications_mode_child.kendoWindow(
			{
				width:"500px",
				actions: ["Close"],
				draggable: false,
				scrollable:false,
				height: "350px",
				modal: true,
				refresh:onref,
				resizable: false,
				close: onClose
			});
			screenName="manage_company_notifications_mode_child";
			manage_company_notifications_mode_child.data("kendoWindow").refresh('./manage_company_notifications_mode_child.html');
			manage_company_notifications_mode_child.data("kendoWindow").title("Edit");
			manage_company_notifications_mode_child.data("kendoWindow").open();
			manage_company_notifications_mode_child.data("kendoWindow").center();
			function onref()
			{
				try
				{
					eval('fn_'+screenName+'()');					
				}
				catch(err)
				{
					alert('E_LO_1005: Unable to load required files. Please contact your support desk.');
					manage_company_notifications_mode_child.data("kendoWindow").close();
				}
			}
		}
	});
	
	/* DELETE BUTTON CLICK */
	$("#manage_company_notifications_mode_delete_btn").click(function()
	{
		if (selected_noti_mode == 0)
		{
			alert("No row has been selected");
		}
		else
		{
			var isActDeact = confirm("Do you want to Delete?");
			if (isActDeact == true)
			{
				Notification_Event_Code = selected_model_noti_mode["n_event_code"];
				Notificaion_Mode = selected_model_noti_mode["n_mode"];
				Attachment_Indicator = selected_model_noti_mode["attach_avl_ind"];
				Template_id = selected_model_noti_mode["n_template_id"];
				rec_tstamp = selected_model_noti_mode['rec_tstamp'];
				save_mode_notification_mode = "D";
				return_value  = executeService_save_manage_company_notification_mode();
				fn_refresh_manage_company_notifications_mode_grid();
			}
		}
	});
	
	/* NOTIFICATION MODE RECIPIENT CLICK */
	$('#manage_company_notifications_mode_manage_company_notifications_mode_recipients_btn').on('click', function()
	{
		if (selected_noti_mode == 0)
		{
			alert("No row has been selected");
		}
		else
		{
			displayLabel = 'Recipients';
			isScreenEditable = true;
			screenName = 'manage_company_notifications_mode_recipients';
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
}

function fn_refresh_manage_company_notifications_mode_grid()
{
	/* VARIABLE INITIALIZATION */
	selected_noti_mode = 0;
	/* DATA SOURCE INITIALIZATION - MANAGE EQUIPMENT SERVICE CONTRACT TEMPLATE */
	manage_company_notifications_mode_list = executeService_retrieve_manage_company_notification_mode_list();
	manage_company_notifications_mode_list_xml = loadXMLString(manage_company_notifications_mode_list);
	manage_company_notifications_mode_datasource = new kendo.data.DataSource(
	{
		data : manage_company_notifications_mode_list_xml,
		pageSize : 6,
		schema :
		{
			type :"xml",
			data : "list/notification_mode",
			model : 
			{
				fields :
				{
					slno : "slno/text()",
					n_event_code : "n_event_code/text()",
					n_mode : "n_mode/text()",
					n_mode_description : "n_mode_description/text()",
					n_template_id : "n_template_id/text()",
					n_template_desc : "n_template_id/text()",
					attach_avl_ind : "attach_avl_ind/text()",
					rec_tstamp : "rec_tstamp/text()"
				}
			}
		}
	});
	
	/* ADDING SERIAL NUMBER ON THE GRID */
	manage_company_notifications_mode_datasource.read();
    manage_company_notifications_mode_datasource_data = manage_company_notifications_mode_datasource.data();
	
	for(var c=0;c<manage_company_notifications_mode_datasource_data.length;c++)
	{
		var count = c+1;
		manage_company_notifications_mode_datasource_data[c].slno = count;
	}
	
	search_field_1 = "";
	search_field_2 = "";
	code_type = "NOTIFY_TEMPLATE_LIST";
	list_of_codes = [];	
	executeService_retrieve_listof_values_for_codes();
	for(var c=0;c<manage_company_notifications_mode_datasource_data.length;c++)
	{
		for(var no_tem_li=0;no_tem_li<list_of_codes.length;no_tem_li++)
		{
			if(manage_company_notifications_mode_datasource_data[c].n_template_id == list_of_codes[no_tem_li].code)
			{
				manage_company_notifications_mode_datasource_data[c].n_template_desc = list_of_codes[no_tem_li].description;
			}
		}
	}
	
	/*GRID INITIALIZATION - MANAGE EQUIPMENT SERVICE CONTRACT TEMPLATE */
	$("#manage_company_notifications_mode_grid").kendoGrid(
	{
		dataSource : manage_company_notifications_mode_datasource,
		selectable : true,
		pageable : false,
		pageSize : 6,
		height : 300,
		toolbar : kendo.template($("#manage_company_notifications_mode_grid_toolbar").html()),
		columns : 
		[
			{
				field : "slno",
				title : "Slno",
				template: '# if (kendo.toString(slno) == "") {# #} else{# ${slno} #}#',
				width : "40px",
			},
			{
				field : "n_mode_description",
				title : "Notification Mode",
				template: '# if (kendo.toString(n_mode_description) == "") {# #} else {# ${n_mode_description} #}#',
				width : "",
			},
			{
				field : "n_template_id",
				title : "Template Name",
				template: '# if (kendo.toString(n_template_id) == "") {# #} else {# ${n_template_id} #}#',
				width : "",
			},
			{
				field : "n_template_desc",
				title : "Template Description",
				template: '# if (kendo.toString(n_template_desc) == "") {# #} else {# ${n_template_desc} #}#',
				width : "",
			},
			{
				field : "attach_avl_ind",
				title : "Attachment Available Indicator",
				template: '# if (kendo.toString(attach_avl_ind) == "1") {# Yes #} else{# No #}#',
				width : "",
			}
		],
		change : function()
		{
			selected_noti_mode = this.select();
			selected_uid_noti_mode = selected_noti_mode.data("uid");
			selected_model_noti_mode = manage_company_notifications_mode_datasource.getByUid(selected_uid_noti_mode);
		}
	});
}
function fn_manage_company_notifications_mode_PreImport()
{
	return true;
}
function fn_manage_company_notifications_mode_PostImport()
{
	return true;
}
function fn_manage_company_notifications_mode_PreExport()
{
	exportConfiguration = {
		mode:'single',
		content:[{
			exportType:"grid",
			fieldId:"manage_company_notifications_mode_grid",
			dispalyLabel:"Data Export"
		}]
	};
	return exportConfiguration;
}
function fn_manage_company_notifications_mode_PostExport()
{
	return true;
}
function fn_manage_company_notifications_mode_PrePrint()
{
	printConfiguration = {
		mode:'single',
		content:[{
			type:"grid",
			fieldId:"manage_company_notifications_mode_grid",
			dispalyLabel:"Data Print"
		}]
	};
	return printConfiguration;
}
function fn_manage_company_notifications_mode_PostPrint()
{
	return true;
}